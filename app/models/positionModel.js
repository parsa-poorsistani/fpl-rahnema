const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const positionSchema = new Schema({
  generalId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    default: null,
  },
  plural_name: { type: String, trim: true, default: null },
  plural_name_short: { type: String, trim: true, default: null },
  singular_name: { type: String, trim: true, default: null },
  singular_name_short: { type: String, trim: true, default: null },
  squad_count: { type: Number, trim: true, default: null },
  squad_min_play: { type: Number, trim: true, default: null },
  squad_max_play: { type: Number, trim: true, default: null },
  ui_shirt_specific: { type: Number, trim: true, default: null },
  sub_positions_locked: [{ type: Number, trim: true, default: null }],
  element_count: { type: Number, trim: true, default: null },
});
