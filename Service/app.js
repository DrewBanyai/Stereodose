const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cors = require("cors")

const userRoutes = require("./api/routes/user");
const playlistRoutes = require("./api/routes/playlist");
const adminRoutes = require("./api/routes/admin");

//  Include debugging and body parsing functionality
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  Routes which should handle requests
app.use("/user", userRoutes);
app.use("/playlist", playlistRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: `Status ${error.status}: ${error.message}` });
})

module.exports = app;
