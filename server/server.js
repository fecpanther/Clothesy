const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(cookieParser());

app.use((req, res, next) => {
  var cookie = req.cookies.cookieName;
  if (!cookie) {
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(10, randomNumber.length);
    res.cookie("cookieName", randomNumber);
  } else {
  }
  next();
});

app.use("/", express.static(path.join(__dirname, "../client/public/")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`Panther listening on port ${port}!`));
