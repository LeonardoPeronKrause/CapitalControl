const { Pool } = require('pg');

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'leonardo',
    password: '1234',
    port: 5432
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

module.exports = {
    query,
    executarQuery
};