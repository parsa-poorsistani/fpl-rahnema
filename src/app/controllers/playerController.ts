import models = require("../models/path");
import { Request, Response } from "express";
import { playerRepo } from "../database/Repository/player.repo";
import { IPlayer, playerPaginateResponse } from "../Interface/player.interface";
import mongoose = require("mongoose");

const getPlayers = async (req: Request, res: Response) => {
  try {
    const { filter, page, limit } = req.query;
    let manager = await models.managerModel
      .findById(req._id)
      .populate(["teamId", { path: "teamId", populate: "picks.player" }]);
    let players: playerPaginateResponse;
    let myPlayerRepo = new playerRepo();
    let picks = manager.teamId.picks;
    let pickIds: mongoose.Types.ObjectId[] = [];
    picks.map((element: any) => {
      if (element.player) {
        pickIds.push(element.player._id);
      }
    });

    players = await myPlayerRepo.paginatePlayers(
      filter as string,
      Number(page),
      Number(limit),
      pickIds
    );

    res.status(200).json({
      data: players.docs,
      total: players.total,
      limit: players.limit,
      page: players.page,
      pages: players.pages,
    });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const getPlayerByName = async (req: Request, res: Response) => {
  try {
    const { filter, page, limit, web_name } = req.query;
    let manager = await models.managerModel
      .findById(req._id)
      .populate(["teamId", { path: "teamId", populate: "picks.player" }]);
    let players: playerPaginateResponse;
    let myPlayerRepo = new playerRepo();
    let picks = manager.teamId.picks;
    let pickIds: mongoose.Types.ObjectId[] = [];
    picks.map((element: any) => {
      if (element.player) {
        pickIds.push(element.player._id);
      }
    });
    players = await myPlayerRepo.getPlayerByName(
      filter as string,
      Number(page),
      Number(limit),
      web_name as string,
      pickIds
    );
    return res.status(200).json({
      data: players.docs,
      total: players.total,
      limit: players.limit,
      page: players.page,
      pages: players.pages,
    });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

export { getPlayers, getPlayerByName };
