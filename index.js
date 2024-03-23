const express = require("express");

const app = express();
const port = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
