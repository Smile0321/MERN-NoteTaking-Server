const { NoteModel } = require("../models/noteModel");
const { UserModel } = require("../models/userModel");

const getAllNotes = async (req, res) => {

  try {
    let { _sort, _order, page, limit, ...rest } = req.query;
    page = +page || 1;
    limit = +limit || 6;
    const skip = (page - 1) * limit;
    let order;
    if (_order) {
      order = _order === "asc" ? 1 : -1;
    }
    if (rest.genre || _order) {
      const totalNote = await NoteModel.find(rest).count();
      const totalPages = Math.ceil(totalNote / limit);
      const result = await NoteModel.find(rest)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: order, updatedAt: -1 });

      return res.status(200).send({ result, totalPages });
    } else {
      const totalNote = await NoteModel.find({}).count();
      const totalPages = Math.ceil(totalNote / limit);
      const result = await NoteModel.find({}).skip(skip)
        .limit(limit).sort({ updatedAt: -1 });

      if (result.length > 0) {
        return res.status(200).send({ result, totalPages });
      } else {
        return res
          .status(400)
          .send({ message: "please create a note first", status: "error" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "error" });
  }
};

const getOneNote = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await NoteModel.findById({ id });
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "error" });
  }
};

const addNote = async (req, res) => {
  
  try {
    const newNote = new NoteModel({ ...req.body, userEmail: req.body.userEmail, createdDate: new Date().getTime(), isArchived: false });
    await newNote.save();
    return res.status(201).send(newNote);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "error" });
  }
};

const updateArchiveStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;

    const foundNote = await NoteModel.findById(id);
    if (foundNote.userId === userId) {
      const updatedNote = await NoteModel.findByIdAndUpdate(
        { _id: id },
        { isArchived: !foundNote.isArchived },
        { new: true }
      );
      if (updatedNote) {
        return res
          .status(201)
          .send({
            status: "success",
            message: foundNote.isArchived == false ? " Archived successfully" : " Unarchived successfully"
          });
      }
    } else {
      return res.status(400).send({
        status: "error",
        message: "you are not authorize to update this note",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, status: "error" });
  }
};

const updateNote = async (req, res) => {
  
  try {
    const id = req.params.id;
    const { userId } = req.body;

    const foundNote = await NoteModel.findById(id);
    if (foundNote.userId === userId) {
      const updatedNote = await NoteModel.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      if (updatedNote) {
        return res
          .status(201)
          .send({ status: "success", message: " updated successfully" });
      }
    } else {
      return res.status(400).send({
        status: "error",
        message: "you are not authorize to update this note",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, status: "error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;

    const foundNote = await NoteModel.findById(id);

    if (foundNote.userId === userId) {
      const deleteNote = await NoteModel.findByIdAndDelete(id);

      if (deleteNote) {
        return res
          .status(200)
          .send({ status: "success", message: "Note deleted successfully" });
      }
    } else {
      return res.status(400).send({
        status: "error",
        message: "you are not authorize to delete this note",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "error" });
  }
};

module.exports = {
  getAllNotes,
  getOneNote,
  addNote,
  updateNote,
  deleteNote,
  updateArchiveStatus
};
