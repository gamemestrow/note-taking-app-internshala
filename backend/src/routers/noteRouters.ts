import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createNoteController, deleteNotesController, readAllNotesController, readOneNotesController, updateNotesController } from "../controllers/noteContollers";

const router = express.Router();

router.post("/create", authMiddleware, createNoteController)
router.get("/readnotes", authMiddleware, readAllNotesController)
router.get("/readnotes/:id", authMiddleware, readOneNotesController)
router.put("/update/:id", authMiddleware, updateNotesController)
router.delete("/delete/:id", authMiddleware, deleteNotesController)

export default router;