const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
var cors = require("cors");
const { verify } = require("crypto");
// const router = express.Router();

const PORT = 3001;
const app = express();
app.use(cors());

require('crypto').randomBytes(64).toString('hex')
app.use(bodyParser.json());

app.post("/api/login", async (req, res) => {
  loginRoute(req, res);
});

const RSA_PRIVATE_KEY = "qwdqwdqwdqdw"//fs.readFileSync("./key.pub", "utf8");

function validateEmailAndPassword() {
  return true;
}
function findUserIdForEmail(email, passwort) {
  if (email == "breuch.tizian@gmail.com") {
    console.log("email match");
    return "1";
  }
  return "0";
}

function loginRoute(req, res) {
  const email = req.body.email;
  const passwort = req.body.passwort;
  console.log(true);
  if (validateEmailAndPassword()) {
    const userId = findUserIdForEmail(email, passwort);
    if (userId == "0") return;

    const jwtBearerToken = jsonwebtoken.sign({}, RSA_PRIVATE_KEY, {
      algorithm: "HS256",
      expiresIn: 120,
      subject: userId,
    });
    // send the JWT back to the user
    res.cookie("SESSIONID", jwtBearerToken, { httpOnly: true, secure: true }); //httpOnly: true,secure: true
    // TODO - multiple options available
  } else {
    // send status 401 Unauthorized
    res.sendStatus(401);
  }
}
const checkIfAuthenticated = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri:
      "https://angularuniv-security-course.auth0.com/.well-known/jwks.json",
  }),
  algorithms: ["HS256"], //only RS256 ?
});

app.route("/api/lessons").get(checkIfAuthenticated);






app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
