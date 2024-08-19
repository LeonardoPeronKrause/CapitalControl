'use strict';

const readline = require('readline');
const { cadastrarAtivo } = require('./cadastro.js');
const { editarAtivo } = require('./edicao.js');
const { verAtivos } = require('./visualizacao.js');
const { excluirAtivo } = require('./exclusao.js');
const { fazerBackup } = require('./backup.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const exibirMenu = function () {
    rl.question('1. Cadastrar um novo ativo. \n2. Editar ativos.\n3. Visualizar Ativos.\n4. Excluir Ativo. \n5. Fazer Backup\n6. Sair.\n\n Qual opção você deseja utilizar? ', function (opcao) {
        switch (opcao) {
            case '1':
                cadastrarAtivo();
                break;
            case '2':
                editarAtivo();
                break;
            case '3':
                verAtivos();
                break;
            case '4':
                excluirAtivo();
                break;
            case '5':
                fazerBackup();
                break;
            case '6':
                sair();
                break;
            default:
                console.log('Opção inválida. Tente novamente...')
                exibirMenu();
                break;
        }
    });
};

const sair = function() {
    console.log('Até logo Investidor!\nSaindo...')
    rl.close();
};

exibirMenu();