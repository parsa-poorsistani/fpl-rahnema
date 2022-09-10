import models = require("../models/path");
import { Request, Response } from "express";

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

  res
    .status(200)
    .json({
      data: players.docs,
      total: players.total,
      limit: players.limit,
      page: players.page,
      pages: players.pages,
    });
};

const getPlayerByName = async (req: Request, res: Response) => {
  try {
    let players = [];
    if (Object.keys(req.query).length !== 0) {
      players = await models.playerModel.paginate(
        {
          web_name: new RegExp("^" + req.query.web_name + "w*", "i"),
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
    }
    if (Object.keys(players).length === 0) {
      return res.status(404).json({ msg: "player not found" });
    }
    return res.status(200).json({
      data: players.docs,
      total: players.total,
      limit: players.limit,
      page: players.page,
      pages: players.pages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};

module.exports = {
  getPlayers,
  getPlayerByName,
};
