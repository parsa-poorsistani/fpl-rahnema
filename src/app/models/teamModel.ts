import {ObjectId,Schema,model, Types} from "mongoose";

interface ITeam {
    managerId:ObjectId,
    picks:[
        {
            player_id:ObjectId,
            team:Number,
            position:ObjectId,
            // selling_price:Number,
            multiplier:Number,
            // purchase_price:Number,
            is_captain:Boolean,
            is_vice_captain:Boolean
        }
    ]
};

const teamSchema = new Schema<ITeam>({
    managerId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Manager'
    },
    picks: [{
        player: {
            type: Types.ObjectId,
            ref:'Player',
            default: null
        },
        // position: {
        //     type: Types.ObjectId,
        //     red:'Position',
        //     default: null
        // },
        multiplier: {
            type: Number,
            default: 1
        },
        // selling_price: {
        //     type: Number,
        //     default: null
        // },
        // purchase_price: {
        //     type: Number,
        //     default: null
        // },
        is_captain: {
            type: Boolean,
            default: false
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

const Team = model('Team', teamSchema);

module.exports = Team;