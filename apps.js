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

const exibirMenu = function (rl) {
    rl.question('1. Cadastrar um novo ativo. \n2. Editar ativos.\n3. Visualizar Ativos.\n4. Excluir Ativo. \n5. Fazer Backup\n6. Sair.\n\n Qual opção você deseja utilizar? ', function (opcao) {
        switch (opcao) {
            case '1':
                cadastrarAtivo(rl);
                break;
            case '2':
                editarAtivo(rl);
                break;
            case '3':
                verAtivos(rl);
                break;
            case '4':
                excluirAtivo(rl);
                break;
            case '5':
                fazerBackup(rl);
                break;
            case '6':
                sair(rl);
                break;
            default:
                console.log('Opção inválida. Tente novamente...')
                exibirMenu(rl);
                break;
        }
    });
};

const sair = function(rl) {
    console.log('Até logo Investidor!\nSaindo...')
    rl.close();
};

exibirMenu(rl);