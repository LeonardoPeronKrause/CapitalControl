'use strict';

const rl = require('./src/readline.js');
const { cadastrarAtivo } = require('./src/cadastro.js');
const { exibirMenuEdicao } = require('./src/edicao.js');
const { verAtivos } = require('./src/visualizacao.js');
const { exibirMenuExclusao } = require('./src/exclusao.js');
const { fazerBackup } = require('./src/backup.js');
const exibirMenu = require('./src/menu.js');
const sair = require('./src/sair.js');

function main() {
    exibirMenu();

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

main();
