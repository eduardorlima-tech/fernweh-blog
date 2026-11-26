var usuarioModel = require("../models/usuarioModel");

function senhaValida(senha) {
    if (senha.length < 8) {
        return false;
    }

    var letrasMaiusculas = /[A-Z]/;
    var letrasMinusculas = /[a-z]/;
    var numeros = /[0-9]/;
    var caracteresEspeciais = /[!@#$%^&*()_+\-=.,;?]/;

    return (
        letrasMaiusculas.test(senha) &&
        letrasMinusculas.test(senha) &&
        numeros.test(senha) &&
        caracteresEspeciais.test(senha)
    );
}

function autenticar(req, res) {
    var email = req.body.emailServer != undefined ? req.body.emailServer : req.body.email;
    var senha = req.body.senhaServer != undefined ? req.body.senhaServer : req.body.senha;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
        return;
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
        return;
    } else if (!email.includes("@")) {
        res.status(400).send("Email inválido.");
        return;
    }

    usuarioModel
        .autenticar(email, senha)
        .then(function (resultadoAutenticar) {
            console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
            console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

            if (resultadoAutenticar.length == 1) {
                console.log(resultadoAutenticar);
                res.status(200).json({
                    id: resultadoAutenticar[0].id,
                    nome: resultadoAutenticar[0].nome,
                    email: resultadoAutenticar[0].email,
                });
            } else if (resultadoAutenticar.length == 0) {
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(403).send("Mais de um usuário com o mesmo login e senha!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer != undefined ? req.body.nomeServer : req.body.nome;
    var email = req.body.emailServer != undefined ? req.body.emailServer : req.body.email;
    var senha = req.body.senhaServer != undefined ? req.body.senhaServer : req.body.senha;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
        return;
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
        return;
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
        return;
    }

    if (nome.length < 3) {
        res.status(400).send("Nome muito curto.");
        return;
    }

    if (nome.length > 100 || email.length > 100) {
        res.status(400).send("Nome e email devem ter no máximo 100 caracteres.");
        return;
    }

    if (!email.includes("@")) {
        res.status(400).send("Email inválido.");
        return;
    }

    if (senhaValida(senha) == false) {
        res.status(400).send("Senha fraca, cadastre uma senha mais forte.");
        return;
    }

    usuarioModel
        .consultarPorEmail(email)
        .then(function (usuarios) {
            if (usuarios.length > 0) {
                res.status(400).send("Erro ao criar conta.");
            } else {
                return usuarioModel
                    .cadastrar(nome, email, senha)
                    .then(function (resultado) {
                        res.status(201).json(resultado);
                    });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarUsuario(req, res) {
    var usuarioId = req.params.usuarioId;
    var nome = req.body.nomeServer != undefined ? req.body.nomeServer : req.body.nome;
    var email = req.body.emailServer != undefined ? req.body.emailServer : req.body.email;

    if (usuarioId == undefined) {
        res.status(400).send("Erro ao identificar usuário.");
        return;
    }

    if (nome == undefined) {
        res.status(400).send("Faltam dados para atualizar o usuário!");
        return;
    }

    if (nome.length < 3) {
        res.status(400).send("Nome muito curto.");
        return;
    }

    if (nome.length > 100 || (email != undefined && email.length > 100)) {
        res.status(400).send("Nome e email devem ter no máximo 100 caracteres.");
        return;
    }

    if (email != undefined && !email.includes("@")) {
        res.status(400).send("Email inválido.");
        return;
    }

    usuarioModel
        .consultarPorId(usuarioId)
        .then(function (usuarios) {
            if (usuarios.length <= 0) {
                res.status(404).send("Erro ao atualizar usuário.");
            } else {
                return usuarioModel
                    .atualizarUsuario(usuarioId, nome, email)
                    .then(function (resultado) {
                        if (resultado.length > 0) {
                            res.status(200).json({
                                id: resultado[0].id,
                                nome: resultado[0].nome,
                                email: resultado[0].email,
                            });
                        } else {
                            res.status(500).send("Erro ao atualizar usuário.");
                        }
                    });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao atualizar o usuário! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function deletarUsuario(req, res) {
    var usuarioId = req.params.usuarioId;

    if (usuarioId == undefined) {
        res.status(400).send("Erro ao identificar usuário.");
        return;
    }

    usuarioModel
        .consultarPorId(usuarioId)
        .then(function (usuarios) {
            if (usuarios.length <= 0) {
                res.status(404).send("Usuário não encontrado.");
            } else {
                return usuarioModel.deletarUsuario(usuarioId).then(function () {
                    res.status(200).send("Usuário deletado com sucesso.");
                });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao deletar o usuário! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    autenticar,
    cadastrar,
    atualizarUsuario,
    deletarUsuario,
};
