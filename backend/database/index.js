const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "nodejs-fullstack",
      connectTimeoutMS: 2000,
      directConnection: true,
      appName: "nodejs-fullstack",
    })
    .then(() => {
      console.log("MongoDB connected...");
    })
    .catch((err) => {
      console.log(
        "failed to connect to the database. terminating the application..."
      );
      console.error(err);
      process.exit(1);
    });
};
