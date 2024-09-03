'use strict';

const rl = require('./readline.js');
const { cadastrarAtivo } = require('./cadastro.js');
const { visualizarAtivos } = require('./visualizacao.js');
const { editarAtivo } = require('./edicao.js');
const { excluirAtivo } = require('./exclusao.js');
const { fazerBackup } = require('./backup.js');
const { exibirMenu } = require('./menuUtils.js');

const iniciarMenu = function() {
    exibirMenu(function(opcao) {
        switch (opcao) {
            case '1':
                cadastrarAtivo(iniciarMenu);
                break;
            case '2':
                visualizarAtivos(iniciarMenu);
                break;
            case '3':
                editarAtivo(iniciarMenu);
                break;
            case '4':
                excluirAtivo(iniciarMenu);
                break;
            case '5':
                fazerBackup(iniciarMenu);
                break;
            case '6':
                console.log('Saindo...');
                rl.close(); // Fecha a interface readline
                break;
            default:
                console.log('Opção inválida! Tente novamente.');
                iniciarMenu(); // Chama novamente o menu
                break;
        }
    });
};

module.exports = iniciarMenu;
