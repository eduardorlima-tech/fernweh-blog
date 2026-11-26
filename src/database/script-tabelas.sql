CREATE DATABASE fernweh;
USE fernweh;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100),
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    dt_atualizacao DATETIME
);

CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL UNIQUE,
    paises_visitados INT NOT NULL,
    viagens_concluidas INT NOT NULL,
    viagens_planejadas INT NOT NULL,
    dias_viajando INT NOT NULL,
    perfil VARCHAR(20) NOT NULL,
    dt_resposta DATETIME DEFAULT CURRENT_TIMESTAMP,
    dt_atualizacao DATETIME,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    CONSTRAINT chk_quiz_numeros CHECK (paises_visitados >= 0 AND viagens_concluidas >= 0
           AND viagens_planejadas >= 0 AND dias_viajando BETWEEN 0 AND 366),
    CONSTRAINT chk_quiz_perfil CHECK (perfil IN ('Comilão','Improvisador','Fotógrafo','Dorminhoco'))
);

CREATE TABLE mes_viagem (
    fk_usuario INT NOT NULL,
    mes VARCHAR(3) NOT NULL,
    quantidade INT NOT NULL,
    PRIMARY KEY (fk_usuario, mes),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    CONSTRAINT chk_mes CHECK (mes IN ('Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez')),
    CONSTRAINT chk_quantidade CHECK (quantidade >= 0)
);

CREATE TABLE continente_visitado (
    fk_usuario INT NOT NULL,
    continente VARCHAR(20) NOT NULL,
    PRIMARY KEY (fk_usuario, continente),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    CONSTRAINT chk_continente CHECK (continente IN ('América','Europa','Ásia','África','Oceania'))
);

CREATE TABLE musica (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    artista VARCHAR(100) NOT NULL,
    capa VARCHAR(300),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

insert into usuario (nome, email, senha) values ('Edu', 'edu@email.com', SHA2('123456', 256));
insert into quiz (fk_usuario, paises_visitados, viagens_concluidas, viagens_planejadas, dias_viajando, perfil)
    values (1, 12, 48, 23, 8, 'Comilão');
insert into mes_viagem (fk_usuario, mes, quantidade) values (1, 'Jan', 2);
insert into mes_viagem (fk_usuario, mes, quantidade) values (1, 'Jul', 1);
insert into mes_viagem (fk_usuario, mes, quantidade) values (1, 'Dez', 3);
insert into continente_visitado (fk_usuario, continente) values (1, 'América');
insert into continente_visitado (fk_usuario, continente) values (1, 'Europa');

insert into musica (fk_usuario, titulo, artista) values (1, 'Evidências', 'Chitãozinho & Xororó');

CREATE USER 'user_fernweh'@'localhost' IDENTIFIED BY 'Fernweh321#';
GRANT SELECT, INSERT, UPDATE, DELETE ON fernweh.* TO 'user_fernweh'@'localhost';
FLUSH PRIVILEGES;