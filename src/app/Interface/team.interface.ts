import mongoose from 'mongoose';

export interface ITeam {
    save(): unknown;
    picks: Array<IPick>
};

export interface IPick {
  player: mongoose.Types.ObjectId
};

