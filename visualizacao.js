'use strict';

const db = require('./database.js');
const rl = require('./readline.js');

const verAtivos = function() {
    rl.question('1. Renda Variável\n2. Renda Fixa\nQual investimento você quer ver: ', function(opcao) {
        switch (opcao) {
            case '1': // Renda Variável
                rl.question('1. Ação Brasileira\n2. Fundo Imobiliário\n3. Ação Americana (BDR)\n4. Criptoativos\nEscolha o ativo que você deseja visualizar: ', function(opcao) {
                    switch (opcao) {
                        case '1':
                            const queryAcao = 'SELECT * FROM acoes';
                            db.query(queryAcao, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message);
                                } else {
                                    console.log('Dados das ações:', results);
                                }
                                exibirMenu();
                            });
                            break;
                        case '2':
                            const queryFii = 'SELECT * FROM fii';
                            db.query(queryFii, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message)
                                } else {
                                    console.log('Dados dos Fundos Imobiliários:', results);
                                }
                                exibirMenu();
                            });
                            break;
                        case '3':
                            const queryBdr = 'SELECT * FROM bdr';
                            db.query(queryBdr, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message);
                                } else {
                                    console.log('Dados das Ações americanas: ', results);
                                }
                                exibirMenu();
                            });
                            break;
                        case '4':
                            const queryCripto = 'SELECT * FROM cripto';
                            db.query(queryCripto, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message);
                                } else {
                                    console.log('Dados das Criptomoedas: ', results);
                                }
                                exibirMenu();
                            });
                            break;
                        default:
                            console.log('Opção inválida. Tente novamente...');
                            verAtivos(); // Chama verAtivos novamente para permitir ao usuário tentar outra opção.
                            break;
                    }
                });
                break;
            case '2': // Renda Fixa
                rl.question('1. Selic\n2. IPCA\n3. CDI\nEscolha qual o indexador da renda fixa que vocÊ deseja visualizar: ', function(opcao) {
                    switch (opcao) {
                        case '1':
                            const querySelic = 'SELECT * FROM selic';
                            db.query(querySelic, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message);
                                } else {
                                    console.log('Dados de Selic: ', results);
                                }
                                exibirMenu();
                            });
                            break;
                        case '2':
                            const queryIpca = 'SELECT * FROM ipca';
                            db.query(queryIpca, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message);
                                } else {
                                    console.log('Dados de IPCA: ', results);
                                }
                                exibirMenu();
                            });
                            break;
                        case '3':
                            const queryCdi = 'SELECT * FROM cdi';
                            db.query(queryCdi, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message)
                                } else {
                                    console.log('Dados de CDI: ', results)
                                }
                                exibirMenu();
                            });
                            break;
                        default:
                            console.log('Opção inválida. Tente novamente...')
                            verAtivos(); // Chama verAtivos novamente para permitir ao usuário tentar outra opção.
                            break;
                    }
                });
                break;
            default:
                console.log('Opção inválida. Tente novamente...');
                verAtivos(); // Chama verAtivos novamente para permitir ao usuário tentar outra opção.
                break;
        } 
    });
};

module.exports = {
    verAtivos
};
