"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const mint = require("./app/service/mint");
const { routes } = require("./app/routes/path");
const route = require("./app/routes/playerRoute");
function setupServer() {
    app.listen(process.env.APPLICATION_PORT, () => {
        console.log(`Server is running on port ${process.env.APPLICATION_PORT}`);
    });
}
app.use("/api/v1", route);
function setRoutes() {
    for (const route in routes) {
        console.log(route);
        app.use("/api/v1", routes[route]);
    }
}
setupServer();
mint.connectDb();
setRoutes();
