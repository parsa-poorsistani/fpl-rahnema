import {ObjectId,Schema,model, Types} from "mongoose";

interface ITeam {
    //needs manager property probably
    managerId:ObjectId,
    picks:[
        {
            element:Number,
            team:Number,
            position:Number,
            selling_price:Number,
            multiplier:Number,
            purchase_price:Number,
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
        player_id: {
            type: Number,
            default: null
        },
        team:{
            type:Number
        },
        position: {
            type: Types.ObjectId,
            default: null
        },
        multiplier: {
            type: Number,
            default: null
        },
        selling_price: {
            type: Number,
            default: null
        },
        purchase_price: {
            type: Number,
            default: null
        },
        is_captain: {
            type: Boolean,
            default: false
        },
        is_vice_captain: {
            type: Boolean,
            default: false
        },
    }]
});

const Team = model('Team', teamSchema);

module.exports = Team;