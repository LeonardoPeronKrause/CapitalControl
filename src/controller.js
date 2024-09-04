'use strict';

const { iniciarMenu } = require('./menu.js'); // Importa iniciarMenu do menu.js

function controlador() {
    iniciarMenu(); // Inicia o menu chamando a função importada
}

module.exports = { controlador };
