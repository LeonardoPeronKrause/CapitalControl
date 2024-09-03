'use strict';

// Importa os módulos necessários
const db = require('./database.js');    // Módulo p interagir c o db
const rl = require('./readline.js');    // Módulo p manipulação da entrada de dados via terminal
const { exibirMenu } = require('./apps.js') // Importa a função p exibir o menu0


// Função para visualizar os ativos de investimeno
const verAtivos = function() {
    // Pergunta ao usuário ql tipo de investimento deseja ver
    rl.question('1. Renda Variável\n2. Renda Fixa\nQual investimento você quer ver: ', function(opcao) {
        switch (opcao) {
            case '1': // Renda Variável
            // Pergunta qual ativo especifico o usuario quer ver
                rl.question('1. Ação Brasileira\n2. Fundo Imobiliário\n3. Ação Americana (BDR)\n4. Criptoativos\nEscolha o ativo que você deseja visualizar: ', function(opcao) {
                    switch (opcao) {
                        case '1':
                            const queryAcao = 'SELECT * FROM acoes'; // Consulta para ações brasileiras
                            db.query(queryAcao, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message); // Exibe erro (se houver)
                                } else {
                                    console.log('Dados das ações:', results); // Exibe os resultado das ações
                                }
                                exibirMenu(); // Exibe o menu apóes consulta
                            });
                            break;
                        case '2':
                            const queryFii = 'SELECT * FROM fii'; // Consulta para fundos imobiliários
                            db.query(queryFii, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message) // Erro (se houver)
                                } else {
                                    console.log('Dados dos Fundos Imobiliários:', results); // Exibe os resultados dos FIIs
                                }
                                exibirMenu(); // Exibe o menu após a consulta
                            });
                            break;
                        case '3':
                            const queryBdr = 'SELECT * FROM bdr'; // Consulta para BDRs
                            db.query(queryBdr, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message); // Erro se houver
                                } else {
                                    console.log('Dados das Ações americanas: ', results); // Exibe os resultados das ações americanas
                                }
                                exibirMenu(); // Menu após a consulta
                            });
                            break;
                        case '4':
                            const queryCripto = 'SELECT * FROM cripto'; // Consulta para criptomoedas
                            db.query(queryCripto, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message); // Erro (se houver)
                                } else {
                                    console.log('Dados das Criptomoedas: ', results); // Exibe os resultados das criptomoedas
                                }
                                exibirMenu(); // Menu após a consulta
                            });
                            break;
                        default:
                            console.log('Opção inválida. Tente novamente...'); // Mensagem para opção inválida
                            verAtivos(); // Permite ao usuário tentar novamente
                            break;
                    }
                });
                break;
            case '2': // Renda Fixa
                // Pergunta qual indexador de renda fixa o usuário deseja visualizar
                rl.question('1. Selic\n2. IPCA\n3. CDI\nEscolha qual o indexador da renda fixa que vocÊ deseja visualizar: ', function(opcao) {
                    switch (opcao) {
                        case '1':
                            const querySelic = 'SELECT * FROM selic'; // Consulta para Selic
                            db.query(querySelic, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message); // Erro (se houver)
                                } else {
                                    console.log('Dados de Selic: ', results); // Exibe os resultados da Selic
                                }
                                exibirMenu(); // Menu após a consulta
                            });
                            break;
                        case '2':
                            const queryIpca = 'SELECT * FROM ipca'; // Consulta para IPCA
                            db.query(queryIpca, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message); // Erro (se houver)
                                } else {
                                    console.log('Dados de IPCA: ', results); // Exibe os resultados do IPCA
                                }
                                exibirMenu(); // Menu apos consulta
                            });
                            break;
                        case '3':
                            const queryCdi = 'SELECT * FROM cdi'; // Consulta para CDI
                            db.query(queryCdi, (err, results) => {
                                if (err) {
                                    console.log('Erro ao puxar dados: ', err.message) // Erro (se houver)
                                } else {
                                    console.log('Dados de CDI: ', results) // Exibe os resultados do CDI
                                }
                                exibirMenu(); // Menu após consulta
                            });
                            break;
                        default:
                            console.log('Opção inválida. Tente novamente...') // Mensagem para opção inválida
                            verAtivos(); // Permite ao usuário tentar novamente
                            break;
                    }
                });
                break;
            default:
                console.log('Opção inválida. Tente novamente...'); // Mensagem para opção inválida
                verAtivos(); // Permite ao usuário tentar novamente
                break;
        } 
    });
};

// Exporta a função verAtivos para uso em outros módulos
module.exports = {
    verAtivos
};