const { Router } = require("express");
const express = require("express");
const { getAllNotes, getOneNote, addNote, deleteNote, updateNote, updateArchiveStatus } = require("../controller/noteController");
const { checkUserAuth } = require("../middleware/authMiddleware");


const noteRouter = Router();

noteRouter.get("/", getAllNotes);

noteRouter.use(checkUserAuth);


noteRouter.get("/:id", getOneNote);
noteRouter.post("/create", addNote);
noteRouter.patch("/:id/edit", updateNote);
noteRouter.put("/:id/archive_handle", updateArchiveStatus);
noteRouter.delete("/:id", deleteNote);




module.exports = { noteRouter };
