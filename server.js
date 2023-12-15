const express = require("express");
const cors = require("cors");
const cityRoutes = require("./routes/cityRoutes");
const schoolRoutes = require("./routes/schoolRoutes");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authorityRoutes = require("./routes/authorityRoutes")
const app = express();

//dbconnection
require("./config/dbconfig").getDbconnection();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/", cityRoutes);
app.use("/", schoolRoutes);
app.use("/", studentRoutes);
app.use("/", userRoutes);
app.use("/", adminRoutes);
app.use("/",authorityRoutes)

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(9999);
console.log("server started at 9999");
