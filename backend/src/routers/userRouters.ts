import express from "express";
import {
    deleteUserContoller,
    updateUserContoller,
    userLoginController,
    userRegistrationContoller,
    updatePasswordController,
    resetPasswordController,
    checkotpController,
    setPasswordController,
} from "../controllers/userControllers";
import { createNoteController } from "../controllers/noteContollers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", userRegistrationContoller);

router.post("/login", userLoginController, createNoteController);

router.put("/update", authMiddleware, updateUserContoller)

router.patch("/updatepassword", authMiddleware, updatePasswordController)

router.post("/resetpassword", resetPasswordController)

router.post("/checkotp", checkotpController)

router.post("/setpassword", setPasswordController)

router.delete("/delete", authMiddleware, deleteUserContoller)

export default router;
