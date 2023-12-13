const express = require("express");
const cors = require("cors");

//dbconnection
require('./config/dbconfig').getDbconnection()

const app = express()

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());



app.listen(9999);
console.log("server started at 9999");