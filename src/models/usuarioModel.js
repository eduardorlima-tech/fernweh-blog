var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", email, "******");
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = ? AND senha = SHA2(?, 256);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [email, senha]);
}

function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, "******");
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES (?, ?, SHA2(?, 256));
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [nome, email, senha]);
}

function consultarPorEmail(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function consultarPorEmail():", email);
    var instrucaoSql = `
        SELECT id, email FROM usuario WHERE email = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [email]);
}

function consultarPorId(usuarioId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function consultarPorId():", usuarioId);
    var instrucaoSql = `
        SELECT id, email FROM usuario WHERE id = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [usuarioId]);
}

function atualizarUsuario(usuarioId, nome, email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarUsuario():", usuarioId, nome, email);
    var campos = "nome = ?, dt_atualizacao = NOW()";
    var valores = [nome];

    if (email != undefined) {
        campos = campos + ", email = ?";
        valores.push(email);
    }

    valores.push(usuarioId);

    var instrucaoSql = `
        UPDATE usuario SET ${campos} WHERE id = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql, valores).then(function () {
        var instrucaoSelect = `
            SELECT id, nome, email FROM usuario WHERE id = ?;
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSelect);
        return database.executar(instrucaoSelect, [usuarioId]);
    });
}

function deletarUsuario(usuarioId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarUsuario():", usuarioId);
    var instrucaoSql = `
        DELETE FROM usuario WHERE id = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [usuarioId]);
}

module.exports = {
    autenticar,
    cadastrar,
    consultarPorEmail,
    consultarPorId,
    atualizarUsuario,
    deletarUsuario
};
