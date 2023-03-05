import { Router } from "express";
import {
  AcceptRequest,
  CancelRequest,
  Contacts,
  ContactsRequests,
  Converstion,
  InsertContact,
  InsertRequest,
  isContact,
  IsRequesting,
  IsSending,
  LastMessage,
  RemoveRequest,
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
router.route("/acceptRequest/:id").post(JWT, AcceptRequest, InsertContact);
router.route("/requests").get(JWT, ContactsRequests);
router.route("/removeRequest/:id").post(JWT, RemoveRequest);
router.route("/cancelRequest/:id").post(JWT, CancelRequest);
router.route("/sendRequest/:id").post(JWT, InsertRequest);
router.route("/isSending/:id").get(JWT, IsSending);
router.route("/isReceving/:id").get(JWT, IsRequesting);
router.route("/converstion/:id").get(JWT, Converstion);

export default router;
