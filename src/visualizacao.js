'use strict';

// Importa os módulos necessários
const db = require('./database.js');    // Módulo p interagir c o db
const rl = require('./readline.js');    // Módulo p manipulação da entrada de dados via terminal
const { iniciarMenu } = require('./menu.js');  // Já está importado aqui

function formatarResultadoRF(ativos) {
    if (ativos.rowCount === 0) {
        console.log('Nenhum ativo encontrado.');
    } else {
        ativos.rows.forEach((ativo, index) => {
            console.log(`Ativo ${index + 1}`);
            console.log(`  Nome: ${ativo.nome}`);
            console.log(`  Preço Médio: ${ativo.pm}`);
            console.log(`  Vencimento: ${ativo.vencimento}`);
            console.log(`  Quantidade: ${ativo.quantidade}`);
            console.log(`  Taxa de Juros: ${ativo.taxajuros} %`);
            console.log(`------------------------`);
        });
    }
}

function formatarResultadoRV(ativos) {
    if (ativos.rowCount === 0) {
        console.log('Nenhum ativo encontrado.');
    } else {
        ativos.rows.forEach((ativo, index) => {
            console.log(`Ativo ${index + 1}:`);
            console.log(`  Nome: ${ativo.nome}`);
            console.log(`  Ticker: ${ativo.ticker}`);
            console.log(`  Preço Médio: R$ ${ativo.pm}`);
            console.log(`  Setor: ${ativo.setor}`);
            console.log(`  Quantidade: ${ativo.quantidade}`);
            console.log('------------------------');
        });
    }
}

// Função para visualizar os ativos de investimento
const verAtivos = function(callback) {
    // Pergunta ao usuário qual tipo de investimento deseja ver
    rl.question('1. Renda Variável\n2. Renda Fixa\n3. Voltar ao Menu\nQual investimento você quer ver: ', function(opcao) {
        switch (opcao) {
            case '1': // Renda Variável
                rl.question('1. Ação Brasileira\n2. Fundo Imobiliário\n3. Ação Americana (BDR)\n4. Criptoativos\n5. Voltar ao Menu\nEscolha o ativo que você deseja visualizar: ', function(opcao) {
                    switch (opcao) {
                        case '1':
                            const queryAcao = 'SELECT * FROM acoes';
                            db.query(queryAcao, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message);
                                } else {
                                    formatarResultadoRV(results);
                                }
                                verAtivos(callback); // Exibe o menu após a consulta
                            });
                            break;
                        case '2':
                            const queryFii = 'SELECT * FROM fii';
                            db.query(queryFii, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message);
                                } else {
                                    formatarResultadoRV(results);
                                }
                                verAtivos(callback); // Exibe o menu após a consulta
                            });
                            break;
                        case '3':
                            const queryBdr = 'SELECT * FROM bdr';
                            db.query(queryBdr, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message);
                                } else {
                                    formatarResultadoRV(results);
                                }
                                verAtivos(callback); // Exibe o menu após a consulta
                            });
                            break;
                        case '4':
                            const queryCripto = 'SELECT * FROM cripto';
                            db.query(queryCripto, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message);
                                } else {
                                    formatarResultadoRV(results);
                                }
                                verAtivos(callback); // Exibe o menu após a consulta
                            });
                            break;
                        case '5':
                            iniciarMenu();
                            break;
                        default:
                            console.log('Opção inválida. Tente novamente...');
                            verAtivos(); // Permite ao usuário tentar novamente
                            break;
                    }
                });
                break;
            case '2': // Renda Fixa
                rl.question('1. Selic\n2. IPCA\n3. CDI\n4. Voltar ao Menu\nEscolha qual o indexador da renda fixa que você deseja visualizar: ', function(opcao) {
                    switch (opcao) {
                        case '1':
                            const querySelic = 'SELECT * FROM selic';
                            db.query(querySelic, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message);
                                } else {
                                    formatarResultadoRF(results);
                                }
                                verAtivos(callback); // Exibe o menu após a consulta
                            });
                            break;
                        case '2':
                            const queryIpca = 'SELECT * FROM ipca';
                            db.query(queryIpca, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message);
                                } else {
                                    formatarResultadoRF(results);
                                }
                                verAtivos(callback); // Exibe o menu após a consulta
                            });
                            break;
                        case '3':
                            const queryCdi = 'SELECT * FROM cdi';
                            db.query(queryCdi, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message);
                                } else {
                                    formatarResultadoRF(results);
                                }
                                verAtivos(callback); // Exibe o menu após a consulta
                            });
                            break;
                        case '4':
                            iniciarMenu();
                            break;
                        default:
                            console.log('Opção inválida. Tente novamente...');
                            verAtivos(callback); // Permite ao usuário tentar novamente
                            break;
                    }
                });
                break;
            case '3':
                iniciarMenu();
                break;
            default:
                console.log('Opção inválida. Tente novamente...');
                verAtivos(callback); // Permite ao usuário tentar novamente
                break;
        }
    });
};

// Exporta a função verAtivos para uso em outros módulos
module.exports = {
    verAtivos
};
