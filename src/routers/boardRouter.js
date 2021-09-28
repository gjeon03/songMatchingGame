import express from "express";
import {
  getUpload,
  postUpload,
  watch,
  getEdit,
  postEdit,
  deleteBoard,
  boardPage,
} from "../controllers/boardController";
import { protectorMiddleware, userCheckMiddleware } from "../middlewares";

const boardRouter = express.Router();

boardRouter.get("/:id([0-9a-f]{24})", watch);
boardRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware, userCheckMiddleware)
  .get(getEdit)
  .post(postEdit);
boardRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware, userCheckMiddleware)
  .get(deleteBoard);
boardRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(postUpload);

export default boardRouter;
