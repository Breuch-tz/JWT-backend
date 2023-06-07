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

 
const authUser = require("./auth/authUser")
const authenticateTokenFunc = authUser.authenticateToken;


const authRoute = require("./routes/auth");
app.use("/api/auth", authenticateTokenFunc, authRoute, (req, res) => { 
});

const loginRoute = require("./routes/login");
app.use("/api/login", loginRoute, (req, res) => {
  // console.log(req.body)
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
