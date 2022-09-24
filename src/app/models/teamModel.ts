import { ObjectId, Schema, model, Types } from "mongoose";
import { ITeam } from "../interface/team.interface";

const teamSchema = new Schema<ITeam>(
  {
    picks: [
      {
        player: {
          type: Types.ObjectId,
          ref: "Player",
          default: null,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Team = model("Team", teamSchema);

export = Team;
