import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
import { home } from "../controllers/homeController";
import { board } from "../controllers/boardController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/board", board);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);

export default rootRouter;