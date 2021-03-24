import { Router } from "express";
import {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} from "../controllers/notes.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// nueva
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated, createNewNote);

// todas
router.get("/notes", isAuthenticated, renderNotes);

// Editar
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

// borar
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

export default router;
