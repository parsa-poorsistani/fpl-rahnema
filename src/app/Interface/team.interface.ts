import mongoose from 'mongoose';
import {objId} from '../Types/types';

export interface ITeam {
    _id:objId,
    picks: Array<IPick>
};

export interface IPick {
  player: mongoose.Types.ObjectId
};

