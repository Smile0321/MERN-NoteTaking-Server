const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title : { type: String, required: true, minlength: 3, maxlength: 70 },
    description : { type: String, required: true },
    createdDate : { type: Number },
    isArchived : { type: Boolean},
    userId: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const AlbumModel = mongoose.model("album", albumSchema);
module.exports = { AlbumModel };
