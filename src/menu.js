'use strict';

const rl = require('./readline.js');

const exibirMenu = function(callback) {
    console.log('--- MENU ---');
    console.log('1. Cadastrar Ativo');
    console.log('2. Visualizar Ativos');
    console.log('3. Editar Ativo');
    console.log('4. Excluir Ativo');
    console.log('5. Fazer Backup');
    console.log('6. Consultar Preço De Um Atual Ativo');
    console.log('7. Sair');

    rl.question('Escolha uma opção: ', (opcao) => {
        callback(opcao);
    });
};

const iniciarMenu = function() {
    exibirMenu(function(opcao) {
        switch (opcao) {
            case '1':
                const { cadastrarAtivo } = require('./cadastro.js');
                cadastrarAtivo(iniciarMenu);
                break;
            case '2':
                const { verAtivos } = require('./visualizacao.js');
                verAtivos(iniciarMenu);
                break;
            case '3':
                const { exibirMenuEdicao } = require('./menuEdicao.js');
                exibirMenuEdicao(iniciarMenu);
                break;
            case '4':
                const { exibirMenuExclusao } = require('./menuExclusao.js');
                exibirMenuExclusao(iniciarMenu);
                break;
            case '5':
                const { fazerBackup } = require('./backup.js');
                fazerBackup(iniciarMenu);
                break;
            case '6':
                const { buscarCotacao } = require('./app.js');
                buscarCotacao(iniciarMenu);
                break;
            case '7':
                const { sair } = require('./sair.js');
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
