import { IauthService } from "../Interface/auth.interface";
import utils = require("../helpers/utils/utils");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ManagerRepo } from "../database/repository/manager.repo";
import { IManager } from "../Interface/manager.interface";
import {
  objId,
  managerSignUpType,
  signInputData,
  authResponseData,
} from "../types/types";
const redis = require("redis");
let redisClient = redis.createClient();
redisClient.connect();
redisClient.on("connect", () => {
  console.log("Connected!");
});

export class AuthService implements IauthService {
  managerRepo = new ManagerRepo();

  async signUpManager(input: signInputData): Promise<string> {
    const { email, country, first_name, last_name, username, password } = input;
    const confirmationCode: Number = await utils.confirmationCodeGenerator();
    redisClient.hSet(`email:${email}`, [
      "first_name",
      first_name,
      "last_name",
      last_name,
      "username",
      username,
      "password",
      password,
      "country",
      country,
      "code",
      confirmationCode,
    ]);
    redisClient.expire(`email:${email}`, 900);
    const result: string | undefined = await utils.mailSender(
      email,
      "confirmation",
      confirmationCode.toString()
    );
    if (result === "error") {
      return result;
    }
    return result;
  };

  async verify(
    email: string,
    code: string
  ): Promise<authResponseData | string> {
    const verCode = await redisClient.hGet(`email:${email}`, "code");
    if (code !== verCode) {
      return "code is wrong";
    }
    const teamId: objId = await this.managerRepo.createTeam();
    const first_name = await redisClient.hGet(`email:${email}`, "first_name");
    const last_name = await redisClient.hGet(`email:${email}`, "last_name");
    const username = await redisClient.hGet(`email:${email}`, "username");
    const password = await redisClient.hGet(`email:${email}`, "password");
    const country = await redisClient.hGet(`email:${email}`, "country");
    const managerData: managerSignUpType = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password,
      country: country,
      teamId: teamId,
      email: email,
    };

    const manager: IManager = await this.managerRepo.createManager(managerData);
    const token: string = jwt.sign({ id: manager._id }, process.env.HASH_KEY!);
    const data: authResponseData = {
      manager: manager._id,
      token: token,
    };
    return data;
  };

  async login(
    username: string,
    password: string
  ): Promise<authResponseData | string> {
    const manager: IManager | null = await this.managerRepo.findManager(
      username
    );

    if (!manager) {
      return "wrong username";
    }
    const isValid: boolean = await bcrypt.compare(password, manager.password);
    if (!isValid) {
      return "wrong password";
    }
    const token: string = jwt.sign({ id: manager._id }, process.env.HASH_KEY!);
    const data: authResponseData = {
      manager: manager._id,
      token: token,
    };
    return data;
  };
};
