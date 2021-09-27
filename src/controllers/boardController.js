import Board from "../models/Board";

export const board = async (req, res) => {
  const items = await Board.find({}).sort({ createdAt: "desc" });
  return res.render("board/board", { pageTitle: "Board", items });
};

export const getUpload = (req, res) => {
  return res.render("board/upload", { pageTitle: "Write" });
};

export const postUpload = async (req, res) => {
  return res.render("board/upload", { pageTitle: "Write" });
};
