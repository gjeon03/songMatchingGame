import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
  res.render("users/join", { pageTitle: "Join" });
export const postJoin = async (req, res) =>
  res.render("users/join", { pageTitle: "Join" });
export const getLogin = (req, res) =>
  res.render("users/login", { pageTitle: "Login" });
export const postLogin = (req, res) =>
  res.render("users/login", { pageTitle: "Login" });
