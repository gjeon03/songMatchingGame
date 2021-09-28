import Board from "../models/Board";
import { handleBoardItems } from "../action/boardAction";

export const board = async (req, res) => {
  const { pageNumber, keyword } = req.query;
  let total = await Board.find({}).sort({ createdAt: "desc" });
  let items = [];
  let len;
  if (keyword) {
    total = await Board.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
      },
    });
  }
  len = total.length;
  if (pageNumber) {
    const start = (parseInt(pageNumber) - 1) * 5;
    if (start < 0) {
      return res.redirect("/board");
    }
    const end = start + 5;
    items = total.slice(start, end);
  } else {
    items = total.slice(0, 5);
  }
  return res.render("board/board", {
    pageTitle: "Board",
    items,
    keyword,
    len,
  });
};

export const boardPage = async (req, res) => {
  const { page } = req.params;
  const total = await Board.find({}).sort({ createdAt: "desc" });
  const start = (parseInt(page) - 1) * 5;
  if (start < 0) {
    return res.redirect("/board");
  }
  const end = start + 5;
  const items = total.slice(start, end);
  return res.render("board/board", { pageTitle: "Board", items });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const { username } = req.session.user;
  const board = await Board.findById(id);
  if (!board) {
    return res.render("404", { pageTitle: "Board not found." });
  }
  return res.render("board/watch", { pageTitle: board.title, board, username });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  console.log("hello:", id);
  const board = await Board.findById(id);
  if (!board) {
    return res.status(404).render("404", { pageTitle: "Board not found." });
  }
  return res.render("board/edit", { pageTitle: `Edit: ${board.title}`, board });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const board = await Board.exists({ _id: id });
  if (!board) {
    return res.status(404).render("404", { pageTitle: "Board not found." });
  }
  await Board.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Board.formatHashtags(hashtags),
  });
  return res.redirect(`/board/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("board/upload", { pageTitle: "Write" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  console.log(req.session.username);
  try {
    await Board.create({
      title,
      description,
      hashtags: Board.formatHashtags(hashtags),
      username: req.session.user.username,
    });
    return res.redirect("/board");
  } catch (e) {
    return res.status(400).render("board/upload", {
      pageTitle: "Write",
      errorMessage: e._message,
    });
  }
};

export const deleteBoard = async (req, res) => {
  const { id } = req.params;
  await Board.findByIdAndDelete(id);
  return res.redirect("/board");
};
