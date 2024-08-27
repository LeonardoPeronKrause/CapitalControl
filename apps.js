<<<<<<< HEAD
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
=======
'use strict';

const rl = require('./readline.js');

const exibirMenu = function () {
    rl.question('1. Cadastrar um novo ativo. \n2. Editar ativos.\n3. Visualizar Ativos.\n4. Excluir Ativo. \n5. Fazer Backup\n6. Sair.\n Qual opção você deseja utilizar? ', function (opcao) {
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

module.exports = {
    rl,
    exibirMenu
>>>>>>> 95948d1ff2e2edca0caabe406ab39b442224d489
};