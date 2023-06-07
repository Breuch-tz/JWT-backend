const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
app.use(cors());

require("crypto").randomBytes(64).toString("hex");
app.use(bodyParser.json());


let user = [{ username: "user1", passwort: "testpw" }];

router.post("/", async (req, res) => {

  
  if (
    user[0].username !== req.body.email ||
    user[0].passwort !== req.body.password
  ) {
    return;
  }
  const token = await generateAccessTokenFunc({ username: req.body.email });
  res.json(token);
  console.log(token);
});

const authUser = require("../auth/authUser");
const { log } = require("console");

const generateAccessTokenFunc = authUser.generateAccessToken;

module.exports = router;
