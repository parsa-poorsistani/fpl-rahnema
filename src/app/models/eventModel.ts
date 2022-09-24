import mongoose from "mongoose";
import { IEvent } from "../Interface/event.interface";

const eventSchema = new mongoose.Schema<IEvent>(
  {
    generalId: { type: String, trim: true, default: null, unique: true },
    name: { type: String, trim: true, default: null },
    deadline_time: { type: String, trim: true, default: null },
    average_entry_score: { type: String, trim: true, default: null },
    finished: { type: Boolean, trim: true, default: false },
    data_checked: { type: Boolean, trim: true, default: false },
    highest_scoring_entry: { type: Number, trim: true, default: 0 },
    deadline_time_epoch: { type: String, trim: true, default: null },
    highest_score: { type: Number, trim: true, default: null },
    is_current: { type: Boolean, trim: true, default: false },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Event", eventSchema);
