import mongoose from "mongoose";
import { objId } from "../types/types";

export interface ITeam {
  _id: objId;
  picks: Array<IPick>;
}

export interface IPick {
  player: mongoose.Types.ObjectId;
}
