'use strict';

const rl = require('./readline.js');
const { cadastrarAtivo } = require('./cadastro.js');
const { exibirMenuEdicao } = require('./menuEdicao.js');
const { exibirMenuExclusao } = require('./menuExclusao.js');
const { fazerBackup } = require('./backup.js');
const { sair } = require('./sair.js');

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

function iniciarMenu() {
    exibirMenu(function(opcao) {
        switch (opcao) {
            case '1':
                cadastrarAtivo(iniciarMenu);
                break;
            case '2':
                const { verAtivos } = require('./visualizacao.js');
                verAtivos(iniciarMenu);
                break;
            case '3':
                exibirMenuEdicao(iniciarMenu);
                break;
            case '4':
                exibirMenuExclusao(iniciarMenu);
                break;
            case '5':
                fazerBackup(iniciarMenu);
                break;
            case '6':
                sair();
                rl.close(); // Fecha a interface readline
                break;
            default:
                console.log('Opção inválida! Tente novamente.');
                iniciarMenu(); // Chama novamente o menu
                break;
        }
    });
}

module.exports = { 
    iniciarMenu,
    exibirMenu
 };
