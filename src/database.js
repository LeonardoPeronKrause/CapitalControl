'use strict';

require('dotenv').config();

const { Pool } = require('pg');

// Cria uma nova instância do Pool p gerenciar as conexoes c o db 
const pool = new Pool ({
    user: process.env.DB_USER,          // nome de usuário
    host: process.env.DB_HOST,          // endereço do servidor do db
    database: process.env.DB_DATABASE,  // nome do db
    password: process.env.DB_PASSWORD,  // senha do usuário do db
    port: process.env.DB_PORT           // porta do servidor 
});

// Função para realizar consulta ao banco de dados
const query = (text, params) => pool.query(text, params);

// Função para executar uma consulta SQL no banco de dados
const executarQuery = function(query, values, mensagemSucesso, callback) {
    //Executa a consulta SQL com os valores fornecidos
    pool.query(query, values, (err) => {
        // Se ocorrer um erro, exibe uma mensagem de erro
        if (err) {
            console.log('Erro ao cadastra dados: ', err.message);
        } else {
            // Se a consulta for bem-sucedida, exibe a mensagem de sucesso
            console.log(mensagemSucesso);
        }
        // Chama o callback, se fornecido (geralmente para o fluxo)
        if (callback) callback();
    });
};

// Exporta as funções query e executarQuery
module.exports = {
    query,
    executarQuery
}
