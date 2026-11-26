var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/cadastrar", function (req, res) {
    quizController.cadastrar(req, res);
});

router.put("/editar/:usuarioId", function (req, res) {
    quizController.atualizar(req, res);
});

router.delete("/deletar/:usuarioId", function (req, res) {
    quizController.deletar(req, res);
});

module.exports = router;
