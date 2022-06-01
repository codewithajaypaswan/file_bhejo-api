const express = require("express");
const cors = require("cors");

const path = require("path");

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());

const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

const connectDB = require("./config/db");
connectDB();

app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
