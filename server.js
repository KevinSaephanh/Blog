const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Config Express App
const app = express();
app.use(express.json());
app.use(cors());

// Config MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB connection has been established!")
);

// Config routes
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const categoriesRouter = require("./routes/categories");

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/categories", categoriesRouter);

// Load the npm build package of the frontend
if (process.env.NODE_ENV === "production") {
  //Set a static folder
  app.use(express.static("frontend/build"));

  // Provide a wildcard as a fallback for all routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

// Config PORT and host app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}!`));
