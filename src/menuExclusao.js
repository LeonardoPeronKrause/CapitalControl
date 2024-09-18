'use strict';

const rl = require('./readline');
const { exclusaoRendaFixa } = require('./exclusao');
const { exclusaoRendaVariavel } = require('./exclusao');
const { sair } = require('./sair');
const { iniciarMenu } = require('./menu');

function exibirMenuExclusao() {
    console.log('=== Menu de Exclusão ===');
    console.log('1. Excluir Ação Brasileira');
    console.log('2. Excluir Fundo Imobiliário (FII)');
    console.log('3. Excluir Ação Americana');
    console.log('4. Excluir Criptomoeda');
    console.log('5. Excluir Ativo de Selic');
    console.log('6. Excluir Ativo de IPCA');
    console.log('7. Excluir Ativo de CDI');
    console.log('8. Voltar ao Menu');

    rl.question('Escolha uma opçao: ', (opcao) => {
        switch (opcao) {
            case '1':
                exclusaoRendaVariavel('acoes', 'Ação Brasileira');
                break;
            case '2':
                exclusaoRendaVariavel('fii', 'Fundo Imobiliário');
                break;
            case '3':
                exclusaoRendaVariavel('bdr', 'Ação Americana');
                break;
            case '4':
                exclusaoRendaVariavel('cripto', 'Criptomoeda');
                break;
            case '5':
                exclusaoRendaFixa('selic', 'Selic');
                break;
            case '6':
                exclusaoRendaFixa('ipca', 'IPCA');
                break;
            case '7':
                exclusaoRendaFixa('cdi', 'CDI');
                break;
            case '8':
                iniciarMenu();
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                iniciarMenu();
                break;
        }
    });
} 

module.exports = {
    exibirMenuExclusao
}
