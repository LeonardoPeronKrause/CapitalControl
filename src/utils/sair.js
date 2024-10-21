'use strict';

const rl = require('./readline');

const sair = function() {
    console.log('Até logo Investidor!\nSaindo...')
    rl.close();
};

module.exports = { sair };
