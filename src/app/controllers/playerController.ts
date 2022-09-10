import models = require("../models/path");
import { Request, Response } from "express";
import { playerRepo } from "../database/Repository/player.repo";
import { IPlayer } from "../database/Interface/player.interface";

const getPlayers = async (req: Request, res: Response) => {
  let players = await models.playerModel.paginate(
    {
      positionId:
        req.query.filter == "0"
          ? { $gt: 0 }
          : req.query.filter
          ? req.query.filter
          : { $gt: 0 },
    },
    {
      page: req.query.page ? req.query.page : 0,
      limit: req.query.limit ? req.query.limit : 10,
      populate: [
        { path: "position", select: ["plural_name_short", "generalId"] },
        { path: "plTeam", select: "short_name" },
      ],
    }
  );

  if (Object.keys(players).length === 0) {
    return res.status(404).json({ msg: "no player found" });
  }

  res.status(200).json({
    data: players.docs,
    total: players.total,
    limit: players.limit,
    page: players.page,
    pages: players.pages,
  });
};

const getPlayerByName = async (req: Request, res: Response) => {
  try {
    const { web_name } = req.body;
    const { filter, page, limit } = req.query;
    let players: IPlayer[] = [];
    if (Object.keys(req.query).length !== 0) {
      let myPlayerRepo = new playerRepo();
      players = await myPlayerRepo.getPlayerByName(
        filter as string,
        Number(page),
        Number(limit),
        web_name
      );
      console.log(players);

      // players = await models.playerModel.paginate(
      //   {
      //     web_name: new RegExp("^" + web_name + "w*", "i"),
      //     positionId: req.query.filter ? req.query.filter : { $gt: 0 },
      //   },
      //   {
      //     page: req.query.page ? req.query.page : 0,
      //     limit: req.query.limit ? req.query.limit : 10,
      //     populate: [
      //       { path: "position", select: ["plural_name_short", "generalId"] },
      //       { path: "plTeam", select: "short_name" },
      //     ],
      //   }
      // );
    }
    if (Object.keys(players).length === 0) {
      return res.status(404).json({ msg: "player not found" });
    }
    return res.status(200).json({ data: players });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};

module.exports = {
  getPlayers,
  getPlayerByName,
};
