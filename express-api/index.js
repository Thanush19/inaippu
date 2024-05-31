const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./route/userRouter");
const demandRouter = require("./route/demandRouter");
const ratingRouter = require("./route/ratingRouter");

const db = require("./config/db");
const port = 3000;

app.use(bodyParser.json());

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT,PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use("/api/user", userRouter);
app.use("/api", demandRouter);
app.use("/api", ratingRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
