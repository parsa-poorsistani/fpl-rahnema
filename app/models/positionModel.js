const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const positionSchema = new Schema({
  generalId: { type: String, trim: true, required: true, unique: true },
  plural_name: { type: String, trim: true },
  plural_name_short: { type: String, trim: true },
  singular_name: { type: String, trim: true },
  singular_name_short: { type: String, trim: true },
  squad_count: { type: Number, trim: true },
  squad_min_play: { type: Number, trim: true },
  squad_max_play: { type: Number, trim: true },
  ui_shirt_specific: { type: Number, trim: true },
  sub_positions_locked: [{ type: Number, trim: true }],
  element_count: { type: Number, trim: true },
});
