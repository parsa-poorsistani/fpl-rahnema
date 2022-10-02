import { IauthService } from "../interface/auth.interface";
import utils = require("../helpers/utils/utils");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ManagerRepo } from "../database/repository/manager.repo";
import { FeedRepo } from "../database/repository/feed.repo";
import { IManager } from "../interface/manager.interface";
import {
  objId,
  managerSignUpType,
  signInputData,
  authResponseData,
} from "../types/types";
const redis = require("redis");
// { url: "redis://redis:6379" }
let redisClient = redis.createClient({ url: "redis://redis:6379" });
redisClient.connect();
redisClient.on("connect", () => {
  console.log("Connected!");
});
import errors = require("../helpers/error/path");

export class AuthService implements IauthService {
  managerRepo = new ManagerRepo();
  feedRepo = new FeedRepo();

  async signUpManager(input: signInputData): Promise<boolean> {
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
    const result: boolean = await utils.mailSender(
      email,
      "confirmation",
      confirmationCode.toString()
    );
    return result;
  }

  async verify(email: string, code: string): Promise<authResponseData> {
    const hasManager = await this.managerRepo.getManagerByEmail(email);
    if (!hasManager) {
      const verCode = await redisClient.hGet(`email:${email}`, "code");
      if (code !== verCode) {
        throw new errors.AccessForbiddenError("wrong or expired code");
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

      const manager: IManager = await this.managerRepo.createManager(
        managerData
      );
      await this.feedRepo.createFeed(manager._id);
      const token: string = jwt.sign(
        { id: manager._id },
        process.env.HASH_KEY!
      );
      const data: authResponseData = {
        manager: manager._id,
        token: token,
      };
      return data;
    } else {
      throw new errors.BadRequestError("manager already exists");
    }
  }

  async login(username: string, password: string): Promise<authResponseData> {
    const manager: IManager | null = await this.managerRepo.findManager(
      username
    );

    if (!manager) {
      throw new errors.NotFoundError("username not found");
    }
    const isValid: boolean = await bcrypt.compare(password, manager.password);
    if (!isValid) {
      throw new errors.AccessForbiddenError("wrong password");
    }
    const token: string = jwt.sign({ id: manager._id }, process.env.HASH_KEY!);
    const data: authResponseData = {
      manager: manager._id,
      token: token,
    };
    return data;
  }
}
