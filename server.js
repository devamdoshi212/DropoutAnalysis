const express = require("express");
const cors = require("cors");

//dbconnection
require('./config/dbconfig').getDbconnection()


//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());