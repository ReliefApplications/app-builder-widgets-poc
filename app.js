var express = require("express");
var handlebars = require("express-handlebars");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.engine(
  ".hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "layout",
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "app-builder")));

var index = require("./routes/index");

app.use("/", index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
