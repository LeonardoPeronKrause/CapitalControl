'use strict';

const rl = require('./readline');
const db = require('./database');

function exibirMenu() {
    console.log('=== Menu de Exclusão ===');
    console.log('1. Excluir Ação Brasileira');
    console.log('2. Excluir Fundo Imobiliário (FII)');
    console.log('3. Excluir Ação Americana');
    console.log('4. Excluir Criptomoeda');
    console.log('5. Excluir Ativo de Selic');
    console.log('6. Excluir Ativo de IPCA');
    console.log('7. Excluir Ativo de CDI');
    console.log('8. Sair');

    rl.question('Escolha uma opçao: ', (opcao) => {
        switch (opcao) {
            case '1':
                exclusaoRendaVariavel('acao', 'Ação Brasileira');
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
                console.log('Até logo, Investidor!');
                rl.close();
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                exibirMenu();
                break;
        }
    });
} 

function exclusaoRendaVariavel(tabela, tipoAtivo) {
    const query = `SELECT * FROM ${tabela}`;

    db.query(query, (err, results) => {
        if (err) {
            console.log(`Erro ao buscar dados de ${tipoAtivo}!`, err.message);
            return exibirMenu();
        }

        if (results.length === 0) {
            console.log(`Nenhum(a) ${tipoAtivo} cadastrado até o momento!`);
            return exibirMenu();
        }

        console.log(`${tipoAtivo} disponíveis para edição:`);
        results.forEach((ativo, index) => {
            console.log(`${index + 1} '${ativo.nome}' (${ativo.ticker}) Preço Médio: ${ativo.pm} Setor: ${ativo.setor} Quantidade: ${ativo.quantidade}`);
        });
        excluirAtivoVariavelSelecionado(tabela, tipoAtivo, results);
    });
}

function exclusaoRendaFixa(tabela, tipoAtivo) {
    const query = `SELECT * FROM ${tabela}`;

    db.query(query, (err, results) => {
        if (err) {
            console.log(`Erro ao buscar dados de ${tipoAtivo}`);
            return exibirMenu();
        }

        if (results.length === 0) {
            console.log(`Nenhum ativo de ${tipoAtivo} cadastrado até o momento!`);
            return exibirMenu();
        }

        console.log(`Ativos de ${tipoAtivo} disponíveis para exclusão:`);
        results.forEach((ativo, index) => {
            console.log(`${index + 1}. '${ativo.nome}' Preço Médio: ${ativo.pm} Vencimento: ${ativo.vencimento} Quantidade de Cotas: ${ativo.quantidade} Taxa de Juros: ${ativo.taxaJuros}`);
        });
        excluirAtivoFixoSelecionado(tabela, tipoAtivo, results);
    });
}

function excluirAtivoVariavelSelecionado(tabela, tipoAtivo, results) {
    rl.question('Qual o número do ativo que você deseja excluir? ', function(numero) {
        if (numero.trim() === '') {
            console.log('Nenhum ativo excluído!');
            return exibirMenu();
        }

        const index = parseInt(numero) - 1;

        if (index >= 0 && index < results.length) {
            const ativoSelecionado = results[index];

            rl.question(`Você tem certeza que deseja excluir o ativo ${ativoSelecionado.nome}? [Use = S para sim/N para não]: `, function(confirmacao) {
                if (confirmacao.toUpperCase() === 'S') {
                    const deleteQuery = `DELETE FROM ${tabela} WHERE id = ?`;
                    db.query(deleteQuery, [ativoSelecionado.id], (err) => {
                        if (err) {
                            console.log('Erro ao excluir o ativo!', err.message);
                        } else {
                            console.log(`O investimento no ativo ${ativoSelecionado.nome} foi excluído com sucesso!`);
                        }
                        exibirMenu();
                    });
                } else if (confirmacao.toUpperCase() === 'N') {
                    console.log('Nenhum ativo excluído!');
                    exibirMenu();
                } else {
                    console.log('Você digitou algo diferente de "S" para sim ou "N" para não');
                    exibirMenu();
                }
            });
        } else {
            console.log('Número inválido.');
            exibirMenu();
        }
    });
}

function excluirAtivoFixoSelecionado(tabela, tipoAtivo, results) {
    rl.question('Qual o número do ativo que você deseja excluir? ', function(numero) {
        if (numero.trim() === '') {
            console.log('Nenhum ativo excluído!');
            return exibirMenu();
        }

        const index = parseInt(numero) - 1;

        if (index >= 0 && index < results.length) {
            const ativoSelecionado = results[index];

            rl.question(`Você tem certeza que deseja excluir o investimento ${ativoSelecionado.nome} de ${tipoAtivo}? [Use S para sim/N para não]: `, function(confirmacao) {
                if (confirmacao.toUpperCase() === 'S') {
                    const deleteQuery = `DELETE FROM ${tabela} WHERE ID = ?`;
                    db.query(deleteQuery, [ativoSelecionado.id], (err) => {
                        if (err) {
                            console.log('Erro ao excluir o ativo!', err.message);
                        } else {
                            console.log(`O investimento ${ativoSelecionado.nome} em ${tabela} foi excluúdo com sucesso!`);
                        }
                        exibirMenu();
                    });
                } else if (confirmacao.toUpperCase() === 'N') {
                    console.log('Nenhum ativo excluído!');
                    exibirMenu();
                } else {
                    console.log('Nenhum ativo excluído!');
                    exibirMenu();
                }
            });
        } else {
            console.log('Número inválido.');
            exibirMenu();
        }
    });
}

module.exports = {
    excluirAtivoFixoSelecionado,
    excluirAtivoVariavelSelecionado, 
    exibirMenu
}
