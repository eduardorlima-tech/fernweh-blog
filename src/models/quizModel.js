var database = require("../database/config");

function cadastrarQuiz(usuarioId, paisesVisitados, viagensConcluidas, viagensPlanejadas, diasViajando, perfil) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarQuiz():", usuarioId, paisesVisitados, viagensConcluidas, viagensPlanejadas, diasViajando, perfil);
    var instrucaoSql = `
        INSERT INTO quiz (fk_usuario, paises_visitados, viagens_concluidas, viagens_planejadas, dias_viajando, perfil)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [usuarioId, paisesVisitados, viagensConcluidas, viagensPlanejadas, diasViajando, perfil]);
}

function cadastrarMeses(usuarioId, meses) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMeses():", usuarioId, meses);
    var placeholders = [];
    var valores = [];

    for (var i = 0; i < meses.length; i++) {
        placeholders.push("(?, ?, ?)");
        valores.push(usuarioId, meses[i].mes, meses[i].quantidade);
    }

    var instrucaoSql = `
        INSERT INTO mes_viagem (fk_usuario, mes, quantidade) VALUES ${placeholders.join(", ")};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, valores);
}

function cadastrarContinentes(usuarioId, continentes) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarContinentes():", usuarioId, continentes);
    var placeholders = [];
    var valores = [];

    for (var i = 0; i < continentes.length; i++) {
        placeholders.push("(?, ?)");
        valores.push(usuarioId, continentes[i]);
    }

    var instrucaoSql = `
        INSERT INTO continente_visitado (fk_usuario, continente) VALUES ${placeholders.join(", ")};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, valores);
}

function cadastrarMusicas(usuarioId, musicas) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMusicas():", usuarioId, musicas);
    var placeholders = [];
    var valores = [];

    for (var i = 0; i < musicas.length; i++) {
        var capa = musicas[i].capa != null ? musicas[i].capa : null;
        placeholders.push("(?, ?, ?, ?)");
        valores.push(usuarioId, musicas[i].titulo, musicas[i].artista, capa);
    }

    var instrucaoSql = `
        INSERT INTO musica (fk_usuario, titulo, artista, capa) VALUES ${placeholders.join(", ")};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, valores);
}

function atualizarQuiz(usuarioId, paisesVisitados, viagensConcluidas, viagensPlanejadas, diasViajando, perfil) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarQuiz():", usuarioId, paisesVisitados, viagensConcluidas, viagensPlanejadas, diasViajando, perfil);
    var instrucaoSql = `
        UPDATE quiz SET
            paises_visitados = ?,
            viagens_concluidas = ?,
            viagens_planejadas = ?,
            dias_viajando = ?,
            perfil = ?,
            dt_atualizacao = NOW()
        WHERE fk_usuario = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [paisesVisitados, viagensConcluidas, viagensPlanejadas, diasViajando, perfil, usuarioId]);
}

function apagarQuiz(usuarioId) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function apagarQuiz():", usuarioId);
    var instrucaoSql = `
        DELETE FROM quiz WHERE fk_usuario = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [usuarioId]);
}

function apagarMeses(usuarioId) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function apagarMeses():", usuarioId);
    var instrucaoSql = `
        DELETE FROM mes_viagem WHERE fk_usuario = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [usuarioId]);
}

function apagarContinentes(usuarioId) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function apagarContinentes():", usuarioId);
    var instrucaoSql = `
        DELETE FROM continente_visitado WHERE fk_usuario = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [usuarioId]);
}

function apagarMusicas(usuarioId) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function apagarMusicas():", usuarioId);
    var instrucaoSql = `
        DELETE FROM musica WHERE fk_usuario = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [usuarioId]);
}

module.exports = {
    cadastrarQuiz,
    cadastrarMeses,
    cadastrarContinentes,
    cadastrarMusicas,
    atualizarQuiz,
    apagarQuiz,
    apagarMeses,
    apagarContinentes,
    apagarMusicas
};
