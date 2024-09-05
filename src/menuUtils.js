'use strict';

const rl = require('./readline');

const exibirMenu = function(callback) {
    console.log('--- MENU ---');
    console.log('1. Cadastrar Ativo');
    console.log('2. Visualizar Ativos');
    console.log('3. Editar Ativo');
    console.log('4. Excluir Ativo');
    console.log('5. Fazer Backup');
    console.log('6. Sair');

    rl.question('Escolha uma opção: ', (opcao) => {
        callback(opcao);
    });
};

module.exports = { exibirMenu };