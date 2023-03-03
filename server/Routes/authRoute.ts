import { Router } from "express";
import {
  Contacts,
  isContact,
  IsRequesting,
  IsSending,
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
router.route("/isContact/:id").get(JWT, isContact);
router.route("/profileState/:id").get(JWT, IsRequesting, IsSending);

export default router;
