import { ObjectId, Schema, model, Types } from "mongoose";

interface ITeam {
    picks:[
        {
            player_id:ObjectId,
            multiplier:Number,
            is_captain:Boolean,
            is_vice_captain:Boolean
        }
    ]
};

const teamSchema = new Schema<ITeam>({
    picks: [{
        player: {
            type: Types.ObjectId,
            ref:'Player',
            default: null
        },
        multiplier: {
            type: Number,
            default: 1
        },
        is_captain: {
          type: Boolean,
          default: false,
        },
        is_vice_captain: {
            type: Boolean,
            default: false
        },
    }]
}, {
    versionKey:false
}
);

const Team = model("Team", teamSchema);

module.exports = Team;
