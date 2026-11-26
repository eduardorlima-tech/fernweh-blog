var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/carregar/:usuarioId", function (req, res) {
    dashboardController.carregar(req, res);
});

module.exports = router;
