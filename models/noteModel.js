const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title : { type: String, required: true, minlength: 3, maxlength: 70 },
    description : { type: String, required: true },
    createdDate : { type: Number },
    isArchived : { type: Boolean},
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const NoteModel = mongoose.model("notes", notesSchema);
module.exports = { NoteModel };
