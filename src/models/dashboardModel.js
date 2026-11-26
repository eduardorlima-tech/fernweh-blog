var database = require("../database/config");

function buscarQuiz(usuarioId) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarQuiz():", usuarioId);
    var instrucaoSql = `
        SELECT
            paises_visitados,
            viagens_concluidas,
            viagens_planejadas,
            dias_viajando,
            perfil
        FROM quiz
        WHERE fk_usuario = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [usuarioId]);
}

function listarMeses(usuarioId) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarMeses():", usuarioId);
    var instrucaoSql = `
        SELECT mes, quantidade FROM mes_viagem
        WHERE fk_usuario = ?
        ORDER BY FIELD(mes, 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [usuarioId]);
}

function listarContinentes(usuarioId) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarContinentes():", usuarioId);
    var instrucaoSql = `
        SELECT continente FROM continente_visitado
        WHERE fk_usuario = ?
        ORDER BY FIELD(continente, 'América', 'Europa', 'Ásia', 'África', 'Oceania');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [usuarioId]);
}

function listarMusicas(usuarioId) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarMusicas():", usuarioId);
    var instrucaoSql = `
        SELECT titulo, artista, capa FROM musica WHERE fk_usuario = ? ORDER BY id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [usuarioId]);
}

module.exports = {
    buscarQuiz,
    listarMeses,
    listarContinentes,
    listarMusicas
};
