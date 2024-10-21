'use strict';

const rl = require('../readline');
const { edicaoRendaVariavel } = require('../edicao');
const { edicaoRendaFixa } = require('../edicao');
const { iniciarMenu } = require('./menu');

function exibirMenuEdicao() {
    console.log('=== Menu de Edição ===');
    console.log('1. Editar Ações Brasileiras');
    console.log('2. Editar Fundos Imobiliários (FIIs)');
    console.log('3. Editar Ações Americanas');
    console.log('4. Editar Criptomoedas');
    console.log('5. Editar Ativos de Selic');
    console.log('6. Editar Ativos de IPCA');
    console.log('7. Editar Ativos de CDI');
    console.log('8. Voltar ao Menu');

    // Solicita a opção escolhida pelo usuário
    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                edicaoRendaVariavel('acoes', 'Ações Brasileiras'); // Edita ações brasileiras
                break;
            case '2':
                edicaoRendaVariavel('fii', 'Fundos Imobiliários'); // Edita FIIs
                break;
            case '3':
                edicaoRendaVariavel('bdr', 'Ações Americanas'); // Edita ações americanas
                break;
            case '4':
                edicaoRendaVariavel('cripto', 'Criptomoedas'); // Edita criptomoedas
                break;
            case '5':
                edicaoRendaFixa('selic', 'Selic'); // Edita ativos de Selic
                break;
            case '6':
                edicaoRendaFixa('ipca', 'IPCA'); // Edita ativos de IPCA
                break;
            case '7':
                edicaoRendaFixa('cdi', 'CDI'); // Edita ativos de CDI
                break;
            case '8':
                iniciarMenu(); // Fecha a leitura
                break;
            default:
                console.log('Opção inválida. Tente novamente.'); // Mensagem de erro
                iniciarMenu(); // Exibe o menu novamente
                break;
        }
    });
}

module.exports = {
    exibirMenuEdicao
}
