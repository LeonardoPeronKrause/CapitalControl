'use strict';

const rl = require('./readline.js');
const { iniciarMenu } = require('./menu.js');
const { cadastrarAtivo } = require('./cadastro.js');
const { exibirMenuEdicao } = require('./edicao.js');
const { verAtivos } = require('./visualizacao.js');
const { exibirMenuExclusao } = require('./exclusao.js');
const { fazerBackup } = require('./backup.js');
const { sair } = require('./sair.js');

function main() {
    iniciarMenu();

    rl.question('Qual opção você deseja utilizar? ', (opcao) => {
        switch (opcao) {
            case '1':
                cadastrarAtivo(() => main());
                break;
            case '2':
                exibirMenuEdicao(() => main());
                break;
            case '3':
                verAtivos(() => main());
                break;
            case '4':
                exibirMenuExclusao(() => main());
                break;
            case '5':
                fazerBackup(() => main());
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

module.exports = main;
