const rl = require('./readline.js');

// Função para fazer perguntas ao usuário e coletar as respostas em um array
const perguntarDados = function(perguntas, callback) {
    // Array para armazenar as respostas do usuário
    const respostas = [];

    // Função interna que faz uma pergunta com base no índice fornecido
    const perguntar = function(indice) {
        // Verifica se todas as perguntas foram feitas
        if (indice >= perguntas.length) {
            // Se sim, chama o callback passando as respostas coletadas
            return callback(respostas);
        }

        // Faz a pergunta correspondente ao índice atual
        rl.question(perguntas[indice], function(resposta) {
            // Adiciona a resposta do usuário ao array de respostas
            respostas.push(resposta);
            // Chama a função recursivamente para a próxima pergunta
            perguntar(indice + 1);
        });
    };
    // Inicia o processo de perguntas a partir do índice 0
    perguntar(0);
};

module.exports = perguntarDados;