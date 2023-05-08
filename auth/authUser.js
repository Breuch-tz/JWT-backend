const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
var cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());

require("crypto").randomBytes(64).toString("hex");
app.use(bodyParser.json());


const TOKEN_SECRET = "qwdqwdqwdqdw"; //fs.readFileSync("./key.pub", "utf8");    bzw secret

async function generateAccessToken(username) {
  return jsonwebtoken.sign(username, TOKEN_SECRET, { expiresIn: "100s" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jsonwebtoken.verify(token, TOKEN_SECRET, (err, user) => {
    console.log(user);
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

module.exports = { generateAccessToken, authenticateToken };
