'use strict';

const rl = require('./src/readline.js');
const { cadastrarAtivo } = require('./src/cadastro.js');
const { exibirMenuEdicao } = require('./src/edicao.js');
const { verAtivos } = require('./src/visualizacao.js');
const { exibirMenuExclusao } = require('./src/exclusao.js');
const { fazerBackup } = require('./src/backup.js');
const exibirMenu = require('./src/menu.js');
 
function main() {
    exibirMenu();

    rl.question('Qual opção você deseja utilizar? ', (opcao) => {
        switch (opcao) {
            case '1':
                cadastrarAtivo();
                break;
            case '2':
                exibirMenuEdicao();
                break;
            case '3':
                verAtivos();
                break;
            case '4':
                exibirMenuExclusao();
                break;
            case '5':
                fazerBackup();
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
