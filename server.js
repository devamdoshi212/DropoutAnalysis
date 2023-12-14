const express = require("express");
const cors = require("cors");
const cityRoutes = require("./routes/cityRoutes");
const schoolRoutes = require("./routes/schoolRoutes");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use("/", cityRoutes);
app.use("/", schoolRoutes);
app.use("/", studentRoutes);
app.use("/", userRoutes);

//dbconnection
require("./config/dbconfig").getDbconnection();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(9999);
console.log("server started at 9999");
