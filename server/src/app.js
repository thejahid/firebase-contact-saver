const express = require("express");
const cors = require("cors");
const config = require("config");

const connectDB = require("../config/db");

const app = express();

//connect database
connectDB();

// server port
const PORT = config.get("PORT");

//init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
// app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/contacts", require("./routes/contacts"));

//allow cross origin
app.use(cors());

//start server
app.listen(PORT, () => console.log(`Server Running at ${PORT}`));
