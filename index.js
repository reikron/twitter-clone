const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./server/db");
const session = require("express-session");
const SessionStore = require("connect-session-knex")(session);
const sessionStore = new SessionStore({ knex: db });
const glob = require("glob");

const DIST = "twitter-clone";
const app = express();
const env = process.env.NODE_ENV || "production";
const isProduction = env === "production";
const port = parseInt(process.env.PORT || "3000");
app.set("env", env);
app.set("port", port);
app.disable("x-powered-by");

app.set("view engine", "html");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
if (isProduction) {
  app.use(express.static(path.join(__dirname, "..", DIST)));
  app.use((req, res, next) => {
    if (req.url.startsWith("/api/")) {
      next();
    } else {
      return res.status(200).sendFile("/", { root: path.join(__dirname, "..", DIST) });
    }
  });
}
app.use(session({ name: "sid", secret: "conduit", cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false, store: sessionStore }));
glob.sync("server/**/*?(.)routes.js").forEach(file => app.use("/api/",require("./" + file)));

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
if (!module.parent) {
  app.listen(port, () => {
    console.log(`Starting Express application at http://localhost:${port} in ${app.get("env")} mode`);
  });
}

module.exports = app;