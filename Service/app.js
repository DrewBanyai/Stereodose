const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cors = require("cors")

const userRoutes = require("./api/routes/user");
const playlistRoutes = require("./api/routes/playlist");
const adminRoutes = require("./api/routes/admin");

//  Include debugging and body parsing functionality
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://stereodoseredux.000webhostapp.com/');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Cache-Control, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Origin, X-Requested-With, X-Powered-By, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'POST');
        return res.status(200).json({});
    }
    next();
});

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