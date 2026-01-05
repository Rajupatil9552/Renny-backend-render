import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true,
      index: true
    },

    description: {
      type: String,
      required: true // HTML allowed
    },

    eventDate: {
      type: Date,
      required: true
    },

    videoLink: {
      type: String // YouTube / Vimeo / external link
    },

    image: {
      type: String // optional banner image
    },

    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
