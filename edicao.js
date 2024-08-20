'use strict';

const db = require('./database');
const rl = require('readline');

const editarAtivo = function() {
     rl.question('Qual a classe de ativo que você deseja editar?\n1. Renda Variável\n2. Renda Fixa', function(opcao) {
        switch (opcao) {
            case '1':
                rl.question('O ativo que você deseja editar está em:\n1. Ações Brasileiras\n2. Fundos Imobiliários (FII)\n3.Ações Americanas\n4. Criptomoedas', function(opcao) {
                    switch (opcao) {
                        case '1':
                            const queryAcao = 'SELECT * FROM acoes';
                            db.query(queryAcao, (err, results) => {
                                if (err) {
                                    console.log('Erro ao buscar dados de ações!', err.message);
                                    return exibirMenu();
                            }    

                            if (results.length === 0) {
                                console.log('Nenhuma ação brasileira cadastrada até o momento!')
                                return exibirMenu();
                            }

                            console.log('Ações disponíveis para edição:');
                            results.forEach((queryAcao, index) => {
                                console.log(`${index+1}. '${queryAcao.nome}' (${queryAcao.codigo}) Preço Médio: ${queryAcao.pm} Setor: ${queryAcao.setor} Quantidade: ${queryAcao.quatidade}`);
                            });

                            rl.question('Qual o número da ação que você deseja editar? ', function(numero) {
                                const index = parseInt(numero) - 1;

                                if (index >= 0 && index < results.length) {
                                    const acaoSelecionada = results[index];

                                    console.log('Se você deixar em branco, os valores não alterarão!');
                                    rl.question('Qual o novo nome da ação? ', function (novoNome) {
                                        rl.question('Qual o novo TICKER da ação? ', function(novoTicker) {
                                            rl.question('Qual o novo preço médio de compra da ação? ', function(novoPm) {
                                                rl.question('Qual o novo setor da ação? ', function (novoSetor) {
                                                    rl.question('Qual a nova quantidade de ação? ', function(novaQuantidade) {

                                                        const updates = []; // Armazena as colunas que serão utilizadas
                                                        const params = []; // Armazena os valores das colunas

                                                        if (novoNome.trim() !== '') {
                                                            updates.push('nome = ?');
                                                            params.push(novoNome);
                                                        }

                                                        if (novoTicker.trim() !== '') {
                                                            updates.push('ticker = ?');
                                                            params.push(novoTicker);
                                                        }

                                                        if (novoPm.trim() !== '') {
                                                            updates.push('pm = ?');
                                                            params.push(novoPm);
                                                        }

                                                        if (novoSetor.trim() !== '') {
                                                            updates.push('setor = ?');
                                                            params.push(novoSetor);
                                                        }

                                                        if (novaQuantidade.trim() !== '') {
                                                            updates.push('quantidade = ?');
                                                            params.push(novaQuantidade)
                                                        }

                                                        if (updates.length > 0) {
                                                            params.push(acaoSelecionada.id); // Adiciona o ID da ação para a cláusula WHERE
                                                            const updateQuery = `UPDATE acao SET ${updates.join(', ')} WHERE id = ?`;
                                                            db.query(updateQuery, params, (err) => {
                                                                if (err) {
                                                                    console.log('Erro ao atualizar a ação: ', err.message);
                                                                } else {
                                                                    console.log('A ação foi atualizada com sucesso!');
                                                                }
                                                                exibirMenu();
                                                            });
                                                        } else {
                                                            console.log('Nenhuma atualização realizada.');
                                                            exibirMenu();
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                    });
                                } else {
                                    console.log('Número inválido. Tente novamente.');
                                    exibirMenu();
                                }
                            });
                        });
                        break;
                        case '2':
                            const queryFii = 'SELECT * FROM fii';
                            db.query(queryFii, (err, results) => {
                                if (err) {
                                    console.log('Erro ao buscar dados de Fundos Imobiliários!');
                                    return exibirMenu();
                                };

                                if (results.length === 0) {
                                    console.log('Nenhum fundo imobiliário cadastrado até o momento!')
                                    return exibirMenu();
                                }

                                console.log('Fundos Imobiliários disponíveis para edição: ');
                                results.forEach((queryFii, index) => {
                                    console.log(`${index+1}. ${queryFii.nome} (${queryFii.ticker}) Preço Médio: ${queryFii.pm} Setor: ${queryFii.setor} Quantidade: ${queryFii.quatidade}.`);
                                });

                                rl.question('Qual o número do Fundos Imobiliário que você deseja editar? ', function(numero) {
                                    const index = parseInt(numero) - 1;

                                    if (index >= 0 && index < results.length) {
                                        const acaoSelecionada = results[index];

                                        console.log('Se você deixar em branco, os valores não alterarão!');
                                        rl.question('Qual o novo nome do fundo imoboliário? ', function(novoNome) {
                                            rl.question('Qual o novo TICKER do fii? ', function(novoTicker) {
                                                rl.question('Qual o novo preço médio de compra? ', function(novoPm) {
                                                    rl.question('Qual o novo setor do fii? ', function(novoSetor) {
                                                        rl.question('Qual a nova quantidade de cotas? ', function(novaQuantidade) {

                                                            const updates = [];
                                                            const params = [];

                                                            if (novoNome.trim() !== '') {
                                                                updates.push('nome = ?');
                                                                 params.push(novoNome);
                                                            }

                                                            if (novoTicker.trim() !== '') {
                                                                updates.push('ticker = ?');
                                                                params.push(novoTicker);
                                                            }

                                                            if (novoPm.trim() !== '') {
                                                                updates.push('pm = ?');
                                                                params.push(novoPm);
                                                            }

                                                            if (novoSetor.trim() !== '') {
                                                                updates.push('setor = ?');
                                                                params.push(novoSetor);
                                                            }

                                                            if (novaQuantidade.trim() !== '') {
                                                                updates.push('quantidade = ?');
                                                                params. push(novaQuantidade);
                                                            }

                                                            if (updates.length > 0) {
                                                                params.push(fiiSelecionado.id) // Add o ID do FII para clausula WHERE
                                                                const updateQuery = `UPDATE fii SET ${updates.join(', ')} WHERE id = ?`;
                                                                db.query(updateQuery, params, (err) => {
                                                                    if (err) {
                                                                        console.log('Erro ao atualizar o fundo imobiliário: ', err.message);
                                                                    } else {
                                                                        console.log('O FII foi atualizado com sucesso!');
                                                                    }
                                                                    exibirMenu();
                                                                });
                                                            } else {
                                                                console.log('Nenhuma atualização realizada.');
                                                            }
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    } else {
                                        console.log('Número inválido. Tente novamente.');
                                        exibirMenu();
                                    }
                                });
                            });
                        break;
                        case '3':
                            const queryBdr = 'SELECT * FROM bdr';
                            db.query(queryBdr, (err, results) => {
                                if (err) {
                                    console.log('Erro ao buscar dados de Ações Americanas.', err.message);
                                    return exibirMenu();
                                }

                                if (results.length === 0) {
                                    console.log('Nenhuma ação americana cadastrada ate o momento!');
                                    return exibirMenu();
                                }

                                console.log('Ações Americanas disponíveis para edição:');
                                results.forEach((queryBdr, index) => {
                                    console.log(`${index+1}. ${queryBdr.nome} (${queryBdr.ticker}) Preço Médio: ${queryBdr.pm} Setor: ${queryBdr.setor} Quantidade: ${queryBdr.quatidade}`);
                                });

                                rl.question('Qual o número da ação americana que você deseja editar? ', function(numero) {
                                    const index = parseInt(numero) - 1;

                                    if (index >= 0 && index < results.length) {
                                        const bdrSelecionada = results[index];

                                        console.log('Se você deixar em branco, os valores não alterarão!');
                                        rl.question('Qual o novo nome da ação americana? ', function(novoNome) {
                                            rl.question('Qual o novo ticker? ', function(novoTicker) {
                                                rl.question('Qual o novo preço médio de compra? ', function(novoPm) {
                                                    rl.question('Qual o novo setor? ', function(novoSetor) {
                                                        rl.question('Qual a nova quantidade de cotas? ', function(novaQuantidade) {

                                                            const updates = []; ; // Armazena as colunas que serão utilizada
                                                            const params = []; ; // Armazena os valores das colunas

                                                            if (novoNome.trim() !== '') {
                                                                updates.push('nome = ?');
                                                                params.push(novoNome);
                                                            }

                                                            if (novoTicker.trim() !== '') {
                                                                updates.push('ticker = ?');
                                                                params.push(novoTicker);
                                                            }

                                                            if (novoPm.trim() !== '') {
                                                                updates.push('pm = ?');
                                                                params.push(novoPm);
                                                            }

                                                            if (novoSetor.trim() !== '') {
                                                                updates.push('setor = ?');
                                                                params.push(novoSetor);
                                                            }

                                                            if (novaQuantidade.trim() !== '') {
                                                                updates.push('quantidade = ?');
                                                                params.push(novaQuantidade);
                                                            }

                                                            if (updates.length > 0) {
                                                                params.push(bdrSelecionada.id);
                                                                const updateQuery = `UPDATE bdr SET ${updates.join(', ')} WHERE id = ?`;
                                                                db.query(updateQuery, params, (err) => {
                                                                    if (err) {
                                                                        console.log('Erro ao atualizar ação americana: ', err.message);
                                                                    } else {
                                                                        console.log('A ação americana foi atualizada com sucesso!');
                                                                    }
                                                                    exibirMenu();
                                                                });
                                                            } else {
                                                                console.log('Nenhuma atualização realizada.');
                                                                exibirMenu();
                                                            }
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    } else {
                                        console.log('Número inválido. Tente novamente.');
                                        exibirMenu();
                                    }
                                });
                            });
                        break;
                        case '4':
                            const queryCripto = 'SELECT * FROM cripto';
                            db.query(queryCripto, (err, results) => {
                                if (err) {
                                    console.log('Erro ao buscar dados de criptoativos');
                                    return exibirMenu();
                                }

                                if (results.length === 0) {
                                    console.log('Nenhuma criptomoeda cadastrada até o momento');
                                    return exibirMenu();
                                }

                                console.log('Criptoativos disponíveis para edição:');
                                results.forEach((queryCripto, index) => {
                                    console.log(`${index+1}. '${queryCripto.nome}' (${queryCripto.codigo}) Preço Médio: ${queryCripto.pm} Setor: ${queryCripto.setor} Quantidade: ${queryCripto.quatidade}`);
                                });

                                rl.question('Qual o número da criptomoeda que você quer editar? ', function(numero) {
                                    const index = parseInt(numero);

                                    if (index >= 0 && results.length) {
                                        const criptoSelecionada = results[index];

                                        console.log('Se você deixar em branco, os valores não alterarão!');
                                        rl.question('Qual o novo nome da criptomoeda? ', function(novoNome) {
                                            rl.question('Qual o novo TICKER da criptomoeda? ', function(novoTicker) {
                                                rl.question('Qual o novo preço médio pago? ', function(novoPm) {
                                                    rl.question('Qual o novo setor da criptomoeda? ', function(novoSetor) {
                                                        rl.question('Qual a nova quantidade de cotas? ', function(novaQuantidade) {
                                                            
                                                            const updates = [];
                                                            const params = [];

                                                            if (novoNome.trim() !== '') {
                                                                updates.push('nome = ?');
                                                                params.push(novoNome);
                                                            }

                                                            if (novoTicker.trim() !== '') {
                                                                updates.push('ticker = ?');
                                                                params.push(novoTicker);
                                                            }
    
                                                            if (novoPm.trim() !== '') {
                                                                updates.push('pm = ?');
                                                                params.push(novoPm);
                                                            }
    
                                                            if (novoSetor.trim() !== '') {
                                                                updates.push('setor = ?');
                                                                params.push(novoSetor);
                                                            }
    
                                                            if (novaQuantidade.trim() !== '') {
                                                                updates.push('quantidade = ?');
                                                                params.push(novaQuantidade)
                                                            }

                                                            if (updates.length > 0) {
                                                                params.push(criptoSelecionada.id);
                                                                const updateQuery = `UPDATE cripto SET ${updates.join(', ')} WHERE id = ?`;
                                                                db.query(updateQuery, params, (err) => {
                                                                    if (err) {
                                                                        console.log('Erro ao atualizar a criptomoeda: ', err.message);
                                                                    }
                                                                    exibirMenu();
                                                                });
                                                            } else {
                                                                console.log('Nenhuma ação realizada.');
                                                                exibirMenu();
                                                            }
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    } else {
                                        console.log('Número inválido. Tente novamente.');
                                        exibirMenu();
                                    }
                                });
                            });
                            break;
                            default:
                                console.log('Opção inválida. Tente novamente.')
                                return exibirMenu();
                    } 
                });
            case '2':
                rl.question('O ativo que você quer editar, esta em:\n1.Selic\nIPCA\nCDI\n', function (opcao) {
                    switch (opcao) {
                        case '1':
                            const querySelic = 'SELECT * FROM selic';
                            db.query(querySelic, (err, results) => {
                                if (err) {
                                    console.log('Erro ao buscar dados de selic: ', err.message)
                                    return exibirMenu();
                                }

                                if (results.length === 0) {
                                    console.log('Nenhum investimento na selic encontrado!');
                                    return exibirMenu();
                                }

                                console.log('Investimentos na selic disponíveis para edição:');
                                results.forEach((querySelic, index) => {
                                    console.log(`${index+1}. '${querySelic.nome}' Preço Médio: ${querySelic.pm} Vencimento: ${querySelic.vencimento} Quantidade de cotas: ${querySelic.quantidade} Taxa de Juros: ${querySelic.taxaJuros}`);
                                });

                                rl.question('Qual o número do investimento que você deseja alterar? ', function(numero) {
                                    const index = parseInt(numero) - 1;

                                    if (index >= 0 && index < results.length) {
                                        const selicSelecionada = results[index];

                                        console.log('Se você deixar em branco, os valores não alterarão!');
                                        rl.question('Qual o novo nome do investimento? ', function(novoNome) {
                                            rl.question('Qual o novo preço médio de compra? ', function(novoPm) {
                                                rl.question('Qual o novo vencimento do investimento? ', function(novoVencimento) {
                                                    rl.question('Qual a nova quantidade de cotas? ', function(novaQuantidade) {
                                                        rl.question('Qual a nova taxa de juros? ', function(novaTaxaJuros) {

                                                            const updates = [];
                                                            const params = [];

                                                            if (novoNome.trim() !== '') {
                                                                updates.push('nome = ?');
                                                                params.push(novoNome);
                                                            }
    
                                                            if (novoPm.trim() !== '') {
                                                                updates.push('pm = ?');
                                                                params.push(novoPm);
                                                            }
    
                                                            if (novoVencimento.trim() !== '') {
                                                                updates.push('vencimento = ?');
                                                                params.push(novoVencimento);
                                                            }
    
                                                            if (novaQuantidade.trim() !== '') {
                                                                updates.push('quantidade = ?');
                                                                params.push(novaQuantidade);
                                                            }
    
                                                            if (novaTaxaJuros.trim() !== '') {
                                                                updates.push('taxaJuros = ?');
                                                                params.push(novaTaxaJuros);
                                                            }

                                                            if (updates.length > 0) {
                                                                params.push(selicSelecionada.id);
                                                                const updateQuery = `UPDATE selic SET ${updates.join(', ')} WHERE id = ?`;
                                                                db.query(updateQuery, params, (err) => {
                                                                    if (err) {
                                                                        console.log('Erro ao atualizar o investimento: ', err.message);
                                                                    } else {
                                                                        console.log('O investimento foi atualizado com sucesso!');
                                                                    }
                                                                    exibirMenu();
                                                                });
                                                            } else {
                                                                console.log('Nenhuma atualização realizada!');
                                                                exibirMenu();
                                                            }
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    } else {
                                        console.log('Número inválido. Tente novamente.');
                                        exibirMenu();
                                    }
                                });
                            });
                        break
                        case '2':
                            const queryIpca = 'SELECT * FROM ipca';
                            db.query(queryIpca, (err, results) => {
                                if (err) {
                                    console.log('Erro ao buscar dados de IPCA: ', err.message)
                                    return exibirMenu();
                                }

                                if (results.length === 0) {
                                    console.log('Nenhum investimento na IPCA encontrado!');
                                    return exibirMenu();
                                }

                                console.log('Investimentos na IPCA disponíveis para edição:');
                                results.forEach((queryIpca, index) => {
                                    console.log(`${index+1}. '${queryIpca.nome}' Preço Médio: ${queryIpca.pm} Vencimento: ${queryIpca.vencimento} Quantidade de cotas: ${queryIpca.quantidade} Taxa de Juros: ${queryIpca.taxaJuros}`);
                                });

                                rl.question('Qual o número do investimento que você deseja alterar? ', function(numero) {
                                    const index = parseInt(numero) - 1;

                                    if (index >= 0 && index < results.length) {
                                        const ipcaSelecionado = results[index];

                                        console.log('Se você deixar em branco, os valores não alterarão!');
                                        rl.question('Qual o novo nome do investimento? ', function(novoNome) {
                                            rl.question('Qual o novo preço médio de compra? ', function(novoPm) {
                                                rl.question('Qual o novo vencimento do investimento? ', function(novoVencimento) {
                                                    rl.question('Qual a nova quantidade de cotas? ', function(novaQuantidade) {
                                                        rl.question('Qual a nova taxa de juros? ', function(novaTaxaJuros) {

                                                            const updates = [];
                                                            const params = [];

                                                            if (novoNome.trim() !== '') {
                                                                updates.push('nome = ?');
                                                                params.push(novoNome);
                                                            }
    
                                                            if (novoPm.trim() !== '') {
                                                                updates.push('pm = ?');
                                                                params.push(novoPm);
                                                            }
    
                                                            if (novoVencimento.trim() !== '') {
                                                                updates.push('vencimento = ?');
                                                                params.push(novoVencimento);
                                                            }
    
                                                            if (novaQuantidade.trim() !== '') {
                                                                updates.push('quantidade = ?');
                                                                params.push(novaQuantidade);
                                                            }
    
                                                            if (novaTaxaJuros.trim() !== '') {
                                                                updates.push('taxaJuros = ?');
                                                                params.push(novaTaxaJuros);
                                                            }

                                                            if (updates.length > 0) {
                                                                params.push(ipcaSelecionado.id);
                                                                const updateQuery = `UPDATE selic SET ${updates.join(', ')} WHERE id = ?`;
                                                                db.query(updateQuery, params, (err) => {
                                                                    if (err) {
                                                                        console.log('Erro ao atualizar o investimento: ', err.message);
                                                                    } else {
                                                                        console.log('O investimento foi atualizado com sucesso!');
                                                                    }
                                                                    exibirMenu();
                                                                });
                                                            } else {
                                                                console.log('Nenhuma atualização realizada!');
                                                                exibirMenu();
                                                            }
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    } else {
                                        console.log('Número inválido. Tente novamente.');
                                        exibirMenu();
                                    }
                                });
                            });
                        break
                        case '3':
                            const queryCdi = 'SELECT * FROM cdi';
                            db.query(queryCdi, (err, results) => {
                                if (err) {
                                    console.log('Erro ao buscar dados de cdi: ', err.message)
                                    return exibirMenu();
                                }

                                if (results.length === 0) {
                                    console.log('Nenhum investimento na cdi encontrado!');
                                    return exibirMenu();
                                }

                                console.log('Investimentos em cdi disponíveis para edição:');
                                results.forEach((queryCdi, index) => {
                                    console.log(`${index+1}. '${queryCdi.nome}' Preço Médio: ${queryCdi.pm} Vencimento: ${queryCdi.vencimento} Quantidade de cotas: ${queryCdi.quantidade} Taxa de Juros: ${queryCdi.taxaJuros}`);
                                });

                                rl.question('Qual o número do investimento que você deseja alterar? ', function(numero) {
                                    const index = parseInt(numero) - 1;

                                    if (index >= 0 && index < results.length) {
                                        const cdiSelecionado = results[index];

                                        console.log('Se você deixar em branco, os valores não alterarão!');
                                        rl.question('Qual o novo nome do investimento? ', function(novoNome) {
                                            rl.question('Qual o novo preço médio de compra? ', function(novoPm) {
                                                rl.question('Qual o novo vencimento do investimento? ', function(novoVencimento) {
                                                    rl.question('Qual a nova quantidade de cotas? ', function(novaQuantidade) {
                                                        rl.question('Qual a nova taxa de juros? ', function(novaTaxaJuros) {

                                                            const updates = [];
                                                            const params = [];

                                                            if (novoNome.trim() !== '') {
                                                                updates.push('nome = ?');
                                                                params.push(novoNome);
                                                            }
    
                                                            if (novoPm.trim() !== '') {
                                                                updates.push('pm = ?');
                                                                params.push(novoPm);
                                                            }
    
                                                            if (novoVencimento.trim() !== '') {
                                                                updates.push('vencimento = ?');
                                                                params.push(novoVencimento);
                                                            }
    
                                                            if (novaQuantidade.trim() !== '') {
                                                                updates.push('quantidade = ?');
                                                                params.push(novaQuantidade);
                                                            }
    
                                                            if (novaTaxaJuros.trim() !== '') {
                                                                updates.push('taxaJuros = ?');
                                                                params.push(novaTaxaJuros);
                                                            }

                                                            if (updates.length > 0) {
                                                                params.push(cdiSelecionado.id);
                                                                const updateQuery = `UPDATE selic SET ${updates.join(', ')} WHERE id = ?`;
                                                                db.query(updateQuery, params, (err) => {
                                                                    if (err) {
                                                                        console.log('Erro ao atualizar o investimento: ', err.message);
                                                                    } else {
                                                                        console.log('O investimento foi atualizado com sucesso!');
                                                                    }
                                                                    exibirMenu();
                                                                });
                                                            } else {
                                                                console.log('Nenhuma atualização realizada!');
                                                                exibirMenu();
                                                            }
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    } else {
                                        console.log('Número inválido. Tente novamente.');
                                        exibirMenu();
                                    }
                                });
                            });
                        break
                        default:
                            console.log('Opção inválida. Tente novamente.');
                            return exibirMenu();
                    }
                });
        }
     });
};

module.exports = {
    editarAtivo
};