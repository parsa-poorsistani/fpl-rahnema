import mongoose from "mongoose";

interface Position {
  generalId: Number;
  plural_name: String;
  plural_name_short: String;
  singular_name: String;
  singular_name_short: String;
  squad_count: Number;
  squad_min_play: Number;
  squad_max_play: Number;
  element_count: Number;
}

const positionSchema = new mongoose.Schema<Position>(
  {
    generalId: {
      type: Number,
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
    element_count: { type: Number, trim: true, default: null },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Position", positionSchema);
