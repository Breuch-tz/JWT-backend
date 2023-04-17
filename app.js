const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require('jwks-rsa');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
var cors = require('cors')

const PORT = 3001;

const app = express();
app.use(cors())

app.use(bodyParser.json());

app.route("/api/login").post(loginRoute());

const RSA_PRIVATE_KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCQgX+jNSW05HAk/vIiKmKfB8zl
L9afFPFtScnAZcIjPnjuFUGJbwerFcFrhDccdYpInc8C574Pt9UYpbZSI5YY2il8
Ce2/0XlJR7hZfd/a2yFiW7+Uo/oK1LR+ghiKcdMu5OeKg7SaVFVO+xdcNqMS6igU
q094Ab4GevXrdInEpQIDAQAB`; //fs.readFileSync('./demos/private.key');

function validateEmailAndPassword(){
    return true
}
function findUserIdForEmail(email){
   if(email = "breuch.tizian@gmail.com"){
    return 1
   };
    
}

function loginRoute(req, res) {
  const email = req.body.email;
   const password = req.body.password;
  if (validateEmailAndPassword()) {
    const userId = findUserIdForEmail(email,password);

    const jwtBearerToken = jsonwebtoken.sign({}, RSA_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 120,
      subject: userId,
    });
    res.cookie("SESSIONID", jwtBearerToken, { secure: true }); //httpOnly: true,secure: true
    // send the JWT back to the user
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
        jwksUri: "https://angularuniv-security-course.auth0.com/.well-known/jwks.json"
    }),
    algorithms: ['RS256']
}); 

app.route('/api/lessons')
    .get(checkIfAuthenticated);


app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
