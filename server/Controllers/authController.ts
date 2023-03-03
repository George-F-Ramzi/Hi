import { NextFunction, Request, Response } from "express";
import pool from "../Middelwaers/mysql";
import Joi from "joi";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import lodash from "lodash";

export const User = (req: Request, res: Response) => {
  let user: string = req.body.user;

  if (typeof user === "undefined") {
    return res.status(404).send("User Not Found");
  }
  pool.query(
    "select username,photo,id from Users where id = ?",
    [user],
    (err, result: RowDataPacket[]) => {
      if (err) return res.status(404).send("Something wrong happen");
      if (lodash.isEmpty(result)) return res.status(404).send("User Not Found");
      res.send(result[0]);
    }
  );
};

export const Search = (req: Request, res: Response) => {
  let value: string = req.params.value;

  if (typeof value === "undefined" && value === "") {
    return res.status(404).send("Search String Not Found");
  }
  pool.query(
    `select username,photo,id from Users where username regexp concat('^',?)`,
    [value],
    (err, result: RowDataPacket[]) => {
      if (err) return res.status(404).send("Something wrong happen");
      res.send(result);
    }
  );
};

export const Contacts = (req: Request, res: Response) => {
  let user: string = req.body.user;

  if (typeof user === "undefined") {
    return res.status(404).send("User Not Found");
  }

  let query: string = `select username,photo,Users.id,details from Contacts 
join Users on Users.id = Contacts.contact_id and Contacts.contact_to = ?`;

  pool.query(query, [user], (err, result: RowDataPacket[]) => {
    if (err) return res.status(404).send("Something wrong happen");
    res.send(result);
  });
};

export const LastMessage = (req: Request, res: Response) => {
  let sender: string = req.params.sender;
  let user: string = req.body.user;

  if (typeof sender === "undefined" && sender === "") {
    return res.status(404).send("Receiver Id Not Found");
  }

  let query: string = `select message from Conversation 
where sender_id = ? and receiver_id = ?
Order by date desc limit 1`;

  pool.query(query, [sender, user], (err, result: RowDataPacket[]) => {
    if (err) return res.status(404).send("Something wrong happen");
    res.send(result[0]?.message);
  });
};

export const isContact = (req: Request, res: Response) => {
  let user: string = req.body.user;
  let id: string = req.params.id;

  if (typeof id === "undefined" && id === "" && typeof user === "undefined") {
    return res.status(404).send("Some details aren't correct");
  }

  if (id === user) {
    return res.status(200).send("Thats You");
  }

  pool.query(
    "select contact_id from Contacts where contact_to = ? and contact_id = ?",
    [user, id],
    (err, result: RowDataPacket[]) => {
      if (err) return res.status(404).send("Something wrong happen");
      if (lodash.isEmpty(result)) return res.status(200).send("Not A Contact");
      return res.status(200).send("Is A Contact");
    }
  );
};

export const IsRequesting = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let user: string = req.body.user;
  let id: string = req.params.id;

  if (typeof id === "undefined" && id === "" && typeof user === "undefined") {
    return res.status(404).send("Some details aren't correct");
  }

  let query: string = `select receiver_id from Contact_Request where receiver_id = ? and sender_id = ?`;

  pool.query(query, [user, id], (err, result: RowDataPacket[]) => {
    if (err) return res.status(404).send("Something wrong happen");
    if (lodash.isEmpty(result)) {
      return next();
    }
    return res.status(200).send("Is Requesting");
  });
};

export const IsSending = (req: Request, res: Response) => {
  let user: string = req.body.user;
  let id: string = req.params.id;

  if (typeof id === "undefined" && id === "" && typeof user === "undefined") {
    return res.status(404).send("Some details aren't correct");
  }

  let query: string = `select receiver_id from Contact_Request where receiver_id = ? and sender_id = ?`;

  pool.query(query, [id, user], (err, result: RowDataPacket[]) => {
    if (err) return res.status(404).send("Something wrong happen");
    if (lodash.isEmpty(result)) {
      return res.status(200).send("Is Not Sending");
    }
    return res.status(200).send("Is Sending");
  });
};
