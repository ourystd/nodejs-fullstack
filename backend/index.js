require("./database").connect();
const express = require("express");
const morgan = require("morgan");

const app = express();
const cors = require("cors");
const userRouter = require("./routes/users");
const auth = require("./middleware/auth");

// Define custom format for logging
morgan.token("requestLog", (req, res) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = forwardedFor
    ? forwardedFor.split(",")[0]
    : req.socket.remoteAddress;

  if (req.method !== "OPTIONS") {
    return JSON.stringify(
      {
        method: req.method,
        url: req.url,
        originalUrl: req.originalUrl,
        status: res.statusCode,
        userAgent: req.headers["user-agent"],
        timestamp: new Date().toISOString(),
        ip,
      },
      null,
      2
    );
  }

  return `OPTIONS ${req.url} ${res.statusCode} ${ip}`;
});

// Use morgan middleware with custom format
app.use(morgan(":requestLog"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);

app.post("/api/v1/hello", auth, (req, res) => {
  res.status(200).send("Hello 🙌 ");
});

const port = process.env.API_PORT || 5000;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
