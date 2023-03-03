import { Request, Response } from "express";
import pool from "../Middelwaers/mysql";
import { LoginType, RegisterType } from "../Types/RouteTypes";
import Joi from "joi";
import lodash from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const Login = (req: Request, res: Response) => {
  let data: LoginType = req.body;
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(data);
  if (error) {
    return res.status(400).send(error.message);
  }
  pool.query(
    "select id,password from Users where email = ?",
    [data.email],
    async (err, result: RowDataPacket[]) => {
      if (err) return res.status(400).send("Something Wrong Happen");
      if (!lodash.isEmpty(result)) {
        let pass = await bcrypt.compare(data.password, result[0].password);
        if (pass) {
          let token: string = jwt.sign(result[0].id, process.env.JWT!);
          res.status(200).header("x-auth-token", token).send("Login Complete");
        } else {
          return res.status(400).send("Invalid Password");
        }
      } else {
        return res.status(400).send("Invalid Email");
      }
    }
  );
};

export const Register = (req: Request, res: Response) => {
  let data: RegisterType = req.body;
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    username: Joi.string().required(),
  });
  const { error } = schema.validate(data);
  if (error) {
    return res.status(400).send(error.message);
  }
  pool.query(
    "select email from Users where email = ?",
    [data.email],
    async (err, result) => {
      if (err) return res.status(400).send("Something Wrong Happen");

      if (!lodash.isEmpty(result)) {
        return res.status(400).send("Email Already Registerd");
      } else {
        let password: string = await bcrypt.hash(data.password, 10);
        pool.query(
          "insert into Users (username,email,password) values (?,?,?)",
          [data.username, data.email, password],
          (err, result: ResultSetHeader) => {
            if (err) return res.status(400).send("Something Wrong Happen");
            else {
              let token: string = jwt.sign(
                result.insertId.toString(),
                process.env.JWT!
              );
              res
                .status(200)
                .header("x-auth-token", token)
                .send("Registering Complete");
            }
          }
        );
      }
    }
  );
};

export const Allow = (req: Request, res: Response) => {
  return res.status(200).send("Allow to join");
};
