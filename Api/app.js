const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Successfully");
  })
  .catch((error) => {
    console.error("DB Connection Error:", error);
  });

app.use("/api/auth", authRoutes);
// app.post("/login", (req, res) => {
//   res.send("My API");
// });

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
