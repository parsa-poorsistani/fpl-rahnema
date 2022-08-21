const express = require("express");
const app = express();
const { routes } = require("./routes/path");
require("dotenv").config();

app.listen(process.env.APPLICATION_PORT, () => {
  console.log(`Server is running on port ${process.env.APPLICATION_PORT}`);
});

function setRoutes() {
  for (const route in routes) {
    app.use("/api/v1", routes[route]);
  }
}
