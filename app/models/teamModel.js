const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    picks: [{
        player_id: {
            type: Number,
            default: null
        },
        position: {
            type: Number,
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
    }],
    chips: [{
        status_for_entry: {
            type: String,
            default: "available"
        },
        played_by_entry: [],
        name: {
            type: String,
            default: null
        },
        number: {
            type: Number,
            default: 1
        },
        start_event: {
            type: Number,
            default: null
        },
        stop_event: {
            type: Number,
            default: null
        },
        chip_type: {
            type: String,
            default: null
        },
    }],
    transfers: {
        cost: {
            type: Number,
            default: null
        },
        status: {
            type: String,
            deafult: null
        },
        limit: {
            type: Number,
            default: null
        },
        made: {
            type: Number,
            default: 0
        },
        banl: {
            type: Number,
            default: null
        },
        value: {
            type: Number,
            default: null
        }
    }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;