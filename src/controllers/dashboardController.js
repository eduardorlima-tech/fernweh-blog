var dashboardModel = require("../models/dashboardModel");

function carregar(req, res) {
    var usuarioId = req.params.usuarioId;
    var resposta = {};

    if (usuarioId == undefined) {
        res.status(400).send("Seu usuarioId está undefined!");
        return;
    }

    dashboardModel
        .buscarQuiz(usuarioId)
        .then(function (quiz) {
            resposta.quiz = quiz[0];
            return dashboardModel.listarMeses(usuarioId);
        })
        .then(function (linhas) {
            resposta.meses = linhas;
            return dashboardModel.listarContinentes(usuarioId);
        })
        .then(function (linhas) {
            resposta.continentes = [];
            for (var i = 0; i < linhas.length; i++) {
                resposta.continentes.push(linhas[i].continente);
            }
            return dashboardModel.listarMusicas(usuarioId);
        })
        .then(function (musicas) {
            resposta.musicas = musicas;

            if (resposta.quiz == undefined) {
                res.status(404).send("Esse usuário ainda não respondeu o quiz.");
                return;
            }

            res.status(200).json(resposta);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao carregar os dados da dashboard! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    carregar,
};
