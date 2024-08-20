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

module.exports = {
    query
};