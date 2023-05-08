const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
app.use(cors());

require("crypto").randomBytes(64).toString("hex");
app.use(bodyParser.json());


let user = [{ username: "user1", passwort: "testpw" }];

router.get("/", async (req, res) => {
  if (
    user[0].username != req.body.username ||
    user[0].passwort != req.body.passwort
  ) {
    return;
  }
  const token = await generateAccessTokenFunc({ username: req.body.username });
  res.json(token);
  console.log(token);
});

const authUser = require("../auth/authUser");

const generateAccessTokenFunc = authUser.generateAccessToken;

module.exports = router;
