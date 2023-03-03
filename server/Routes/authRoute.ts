import { Router } from "express";
import {
  Contacts,
  LastMessage,
  Search,
  User,
} from "../Controllers/authController";
import { JWT } from "../Middelwaers/JWT";

const router = Router();

router.route("/user").get(JWT, User);
router.route("/search/:value").get(JWT, Search);
router.route("/contacts").get(JWT, Contacts);
router.route("/last/:sender").get(JWT, LastMessage);

export default router;
