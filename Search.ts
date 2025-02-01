import mongoose from "mongoose";

export const SearchSchema = new mongoose.Schema({
  search: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  timeFrame: {
    type: String,
  },
  result: {
    type: Object,
    required: true,
  },
});

export default mongoose.model("Search", SearchSchema);
