const express = require("express");

const accountsRouter = require("./accounts/accounts-router.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountsRouter);

server.use("*", function(request, response) {
    response.status(404).json({ message: "page is not found" });
});

module.exports = server;
