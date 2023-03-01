import { Router } from "express";
import { Allow, Login, Register } from "../Controllers/userController";
import { JWT } from "../Middelwaers/JWT";

const router = Router();

router.route("/login").post(Login);
router.route("/join").post(Register);
router.route("/allow").post(JWT, Allow);

export default router;
