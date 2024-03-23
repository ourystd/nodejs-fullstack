require("./database").connect();
const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const auth = require("./middleware/auth");

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
