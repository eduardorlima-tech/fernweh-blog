var quizModel = require("../models/quizModel");

function dadosCompletos(body) {
    if (
        body.paisesVisitados == undefined ||
        body.viagensConcluidas == undefined ||
        body.viagensPlanejadas == undefined ||
        body.diasViajando == undefined ||
        body.perfil == undefined ||
        body.meses == undefined ||
        body.continentes == undefined ||
        body.musicas == undefined
    ) {
        return false;
    }

    return true;
}

function cadastrar(req, res) {
    var b = req.body;

    if (b.usuarioId == undefined || !dadosCompletos(b)) {
        res.status(400).send("Faltam dados do quiz!");
        return;
    }

    quizModel
        .cadastrarQuiz(b.usuarioId, b.paisesVisitados, b.viagensConcluidas, b.viagensPlanejadas, b.diasViajando, b.perfil)
        .then(function () {
            return quizModel.cadastrarMeses(b.usuarioId, b.meses);
        })
        .then(function () {
            return quizModel.cadastrarContinentes(b.usuarioId, b.continentes);
        })
        .then(function () {
            return quizModel.cadastrarMusicas(b.usuarioId, b.musicas);
        })
        .then(function () {
            res.status(201).send("Quiz cadastrado com sucesso!");
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao cadastrar o quiz! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizar(req, res) {
    var usuarioId = req.params.usuarioId;
    var b = req.body;

    if (!dadosCompletos(b)) {
        res.status(400).send("Faltam dados do quiz!");
        return;
    }

    quizModel
        .atualizarQuiz(usuarioId, b.paisesVisitados, b.viagensConcluidas, b.viagensPlanejadas, b.diasViajando, b.perfil)
        .then(function () {
            return quizModel.apagarMeses(usuarioId);
        })
        .then(function () {
            return quizModel.cadastrarMeses(usuarioId, b.meses);
        })
        .then(function () {
            return quizModel.apagarContinentes(usuarioId);
        })
        .then(function () {
            return quizModel.cadastrarContinentes(usuarioId, b.continentes);
        })
        .then(function () {
            return quizModel.apagarMusicas(usuarioId);
        })
        .then(function () {
            return quizModel.cadastrarMusicas(usuarioId, b.musicas);
        })
        .then(function () {
            res.status(200).send("Quiz atualizado com sucesso!");
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao atualizar o quiz! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function deletar(req, res) {
    var usuarioId = req.params.usuarioId;

    quizModel
        .apagarMeses(usuarioId)
        .then(function () {
            return quizModel.apagarContinentes(usuarioId);
        })
        .then(function () {
            return quizModel.apagarMusicas(usuarioId);
        })
        .then(function () {
            return quizModel.apagarQuiz(usuarioId);
        })
        .then(function () {
            res.status(200).send("Quiz deletado com sucesso!");
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao deletar o quiz! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar,
    atualizar,
    deletar,
};
