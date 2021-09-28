import Board from "./models/Board";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Song Game";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const userCheckMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const board = await Board.findById(id);
  if (req.session.loggedIn && req.session.user.username === board.username) {
    return next();
  } else {
    return res.redirect("/board");
  }
};
