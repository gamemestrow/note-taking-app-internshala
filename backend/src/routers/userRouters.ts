import express from "express";
import {
    checkotpController,
    deleteUserContoller,
    otpRegistrationController,
    // updateUserContoller,
    userLoginController,
    otpSignInController,
    getUserController,
    userSignOutController,
    // userRegistrationContoller,
    // updatePasswordController,
    // resetPasswordController,
    // checkotpController,
    // setPasswordController,
} from "../controllers/userControllers";
import { createNoteController } from "../controllers/noteContollers";
import { authMiddleware } from "../middlewares/authMiddleware";
import { otpMiddleware } from "../middlewares/otpMiddleware";

const router = express.Router();

router.get("/",authMiddleware, getUserController)

router.post("/register", otpRegistrationController);

router.post("/checkotp",otpMiddleware ,checkotpController );

router.post("/signin", userLoginController);

router.post("/checkotpsignin", otpMiddleware, otpSignInController);

router.get("/signout", authMiddleware, userSignOutController)

// router.put("/update", authMiddleware, updateUserContoller)

// router.patch("/updatepassword", authMiddleware, updatePasswordController)

// router.post("/resetpassword", resetPasswordController)

// router.post("/checkotp", checkotpController)

// router.post("/setpassword", setPasswordController)

router.delete("/delete", authMiddleware, deleteUserContoller)

export default router;
