const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
var cors = require("cors");
const { verify } = require("crypto");
const { log } = require("console");
// const router = express.Router();

const PORT = 3001;
const app = express();
app.use(cors());

require("crypto").randomBytes(64).toString("hex");
app.use(bodyParser.json());


const TOKEN_SECRET = "qwdqwdqwdqdw"; //fs.readFileSync("./key.pub", "utf8");    bzw secret

//////////
//////////

app.post("/api/createNewUser", async (req, res) => {
  const token = await generateAccessToken({ username: req.body.username });
  res.json(token);
  console.log(token)
});

async function generateAccessToken(username) {
  return jsonwebtoken.sign(username, TOKEN_SECRET, { expiresIn: "100s" });
}

///////
///////

// app.get("/api/auth", authenticateToken, (req, res) => {
//   res.json("token valid");
// });

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




const authRoute = require('./routes/auth')
app.use("/api/auth", authenticateToken, authRoute, (req, res) => {
  res.json("token valid");
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
