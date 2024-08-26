'use strict';

const rl = require('./readline.js');
const cadastro = require('./cadastro.js');
const edicao = require('./edicao.js');
const visualizacao = require('./visualizacao.js');
const exclusao = require('./exclusao.js');
const backup = require('./backup.js');

function exibirMenu() {
    console.log('1. Cadastrar um novo ativo. \n2. Editar ativos.\n3. Visualizar Ativos.\n4. Excluir Ativo. \n5. Fazer Backup\n6. Sair.');
}

function main() {
    exibirMenu();

    rl.question('Qual opção você deseja utilizar? ', (opcao) => {
        switch (opcao) {
            case '1':
                cadastro.cadastrarAtivo();
                break;
            case '2':
                edicao.editarAtivo();
                break;
            case '3':
                visualizacao.verAtivos();
                break;
            case '4':
                exclusao.excluirAtivo();
                break;
            case '5':
                backup.fazerBackup();
                break;
            case '6':
                sair();
                break;
            default:
                console.log('Opção inválida. Tente novamente...')
                main();
                break;
        }
    })
};

const sair = function() {
    console.log('Até logo Investidor!\nSaindo...')
    rl.close();
};

main();

module.exports = {
    sair
};