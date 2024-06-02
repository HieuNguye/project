const express = require("express");



// const cors = require("cors");
const http = require("http");
const session = require("express-session");
const cors = require("cors");
const app = express();

const server = http.createServer(app);
app.use("/uploads", express.static("uploads"));
const body_parser = require("body-parser");
app.use(body_parser.urlencoded({ extended: false }));

app.use(body_parser.json());
app.use(cors({ origin: "*" }));

app.use(
  session({
    secret: "1234567890qwertyuiopasdfghjklzxcvbnm[]:",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);


const routes = require('./src/app/routes/routes')
app.use("/api", routes);




server.listen(8000, () => {
  console.log("Server is running on port 8000");
});