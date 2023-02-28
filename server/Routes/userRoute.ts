import { Router } from "express";
import { Login, Register } from "../Controllers/userController";

const router = Router();

router.route("/login").post(Login);
router.route("/join").post(Register);

export default router;
