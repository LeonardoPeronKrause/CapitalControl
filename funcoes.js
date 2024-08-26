'use strict';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const exibirMenu = function () {
    rl.question('1. Cadastrar um novo ativo. \n2. Editar ativos.\n3. Visualizar Ativos.\n4. Excluir Ativo. \n5. Fazer Backup\n6. Sair.\n\n Qual opção você deseja utilizar? ', function (opcao) {
        switch (opcao) {
            case '1':
                cadastrarAtivo();
                break;
            case '2':
                editarAtivo();
                break;
            case '3':
                verAtivos();
                break;
            case '4':
                excluirAtivo();
                break;
            case '5':
                fazerBackup();
                break;
            case '6':
                sair();
                break;
            default:
                console.log('Opção inválida. Tente novamente...')
                exibirMenu();
                break;
        }
    })
};

const cadastrarAtivo = function() {
    rl.question('1. Renda Variável\n2. Renda Fixa\nQual a categoria de ativo que você deseja cadastrar?', function(opcao) {
        if (opcao === '1') {
            rl.question('1. Ação Brasileira\n2. Fundo Imobiliário\n3. Ação Americana (BDR)\n4. Criptoativos\n Qual dos segmentos você deseja cadastrar? ', function(opcao) {
                if (opcao === '1') {
                    cadastrarAcaoBrasileira();
                } else if (opcao === '2') {
                    cadastrarFundoImobiliario();
                } else if (opcao === '3') {
                    cadastrarAcaoAmericana();
                } else if (opcao === '4') {
                    cadastrarCriptoativo();
                } else {
                    console.log('Opção inválida. Tente novamente...')
                    cadastrarAtivo();
                }
            });
        } else if (opcao === '2') {
            rl.question('1. Selic\n2. IPCA\n3. CDI\n4. PIB\n5. Dólar\nQual o indexador do seu investimento em renda fixa? ', function(opcao) {
                if (opcao === '1') {
                    cadastrarRFSelic();
                } else if (opcao === '2') {
                    cadastrarRFIPCA(); 
                } else if (opcao === '3') {
                    cadastrarRFCDI();
                } else if (opcao === '4') {
                    cadastrarRFPIB();
                } else if (opcao === '5') {
                    cadastrarRFDolar();
                } else {
                    console.log('Opção Inválida. Tente novamente...')
                    cadastrarAtivo();
                }
            });
        } else {
            console.log('Opcão inválida. Tente novamente...')
            exibirMenu();
        }
    });
}

const editarAtivo = function() {
    console.log('Função de editar ativo ainda não implementada.');
    exibirMenu(); 
}

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
}

const excluirAtivo = function() {
    console.log('Função de excluir ativo ainda não implementada.');
    exibirMenu(); 
};

const fazerBackup = function() {
    console.log('Função de fazer backup ainda não implementada.');
    exibirMenu();
};

const sair = function() {
    console.log('Até logo Investidor!\nSaindo...')
    rl.close();
};

const cadastrarAcaoBrasileira = function() {
    rl.question('Nome da ação: ', function(nome) {
        rl.question('Código da ação: (Ex.: PETR3) ',function(ticker) {
            rl.question('Preço médio de compra ação: ', function(pm) {
                rl.question('Setor: ', function(setor) {
                    rl.question('Quantidade de ações: ', function(quantidade) {
                        if (!nome || !ticker || !pm || !setor || !quantidade) {
                            console.log('Todos os campos precisam ser preenchidos');
                            return exibirMenu();
                        }

                        pm = pm.replace(',', '.');

                        const precoMedio = parseFloat(pm);
                        const quantidadeCotas = parseInt(quantidade);

                        if (isNaN(precoMedio) || isNaN(quantidadeCotas)) {
                            console.log('Preço médio ou quantidade de ações inválidos.')
                            return exibirMenu();
                        }

                        const query = `INSERT INTO acoes (nome, ticker, pm, setor, quantidade) VALUES (?, ?, ?, ?, ?)`;
                        const values = [nome, ticker, precoMedio, setor, quantidadeCotas]; 

                        db.query(query, values, (err) => {
                            if (err) {
                                console.log('Erro ao cadastrar dados da ação: ', err.message);
                            } else {
                                console.log(`A ação ${nome} (${ticker}) foi cadastrada com sucesso!`);
                            }
                            exibirMenu();
                        });
                    });
                });
            });
        });
    });
}

const cadastrarFundoImobiliario = function() {
    rl.question('Nome do Fundo Imobiliário (FII): ', function(nome) {
        rl.question('Código do FII: (Ex.: MXRF11) ',function(ticker) {
            rl.question('Preço médio de compra do FII: ', function(pm) {
                rl.question('Setor: ', function(setor) {
                    rl.question('Quantidade de cotas: ', function(quantidade) {
                        if (!nome || !ticker || !pm || !setor || !quantidade) {
                            console.log('Todos os campos precisam ser preenchidos');
                            return exibirMenu();
                        }

                        pm = pm.replace(',', '.');

                        const precoMedio = parseFloat(pm);
                        const quantidadeCotas = parseInt(quantidade);

                        if (isNaN(precoMedio) || isNaN(quantidadeCotas)) {
                            console.log('Preço médio ou quantidade de ações inválidos.')
                            return exibirMenu();
                        }

                        const query = `INSERT INTO fii (nome, ticker, pm, setor, quantidade) VALUES (?, ?, ?, ?, ?)`;
                        const values = [nome, ticker, precoMedio, setor, quantidadeCotas]; 

                        db.query(query, values, (err) => {
                            if (err) {
                                console.log('Erro ao cadastrar dados do fundo imobiliário: ', err.message);
                            } else {
                                console.log(`O fundo imobiliário ${nome} (${ticker}) foi cadastrado com sucesso!`);
                            }
                            exibirMenu();
                        });
                    });
                });
            });
        });
    });
}

const cadastrarAcaoAmericana = function() {
    rl.question('Nome da ação americana (BDR): ', function(nome) {
        rl.question('Código da ação: (Ex.: AAPL34) ',function(ticker) {
            rl.question('Preço médio de compra ação: ', function(pm) {
                rl.question('Setor: ', function(setor) {
                    rl.question('Quantidade de ações: ', function(quantidade) {
                        if (!nome || !ticker || !pm || !setor || !quantidade) {
                            console.log('Todos os campos precisam ser preenchidos');
                            return exibirMenu();
                        }

                        pm = pm.replace(',', '.');

                        const precoMedio = parseFloat(pm);
                        const quantidadeCotas = parseInt(quantidade);

                        if (isNaN(precoMedio) || isNaN(quantidadeCotas)) {
                            console.log('Preço médio ou quantidade de ações inválidos.')
                            return exibirMenu();
                        }

                        const query = `INSERT INTO bdr (nome, ticker, pm, setor, quantidade) VALUES (?, ?, ?, ?, ?)`;
                        const values = [nome, ticker, precoMedio, setor, quantidadeCotas]; 

                        db.query(query, values, (err) => {
                            if (err) {
                                console.log('Erro ao cadastrar dados da ação: ', err.message);
                            } else {
                                console.log(`A ação americana ${nome} (${ticker}) foi cadastrada com sucesso!`);
                            }
                            exibirMenu();
                        });
                    });
                });
            });
        });
    });
}

const cadastrarCriptoativo = function() {
    rl.question('Nome da criptomoeda: ', function(nome) {
        rl.question('Código da criptomoeda: (Ex.: BTC) ',function(ticker) {
            rl.question('Preço médio de compra: ', function(pm) {
                rl.question('Setor: (opcional) ', function(setor) {
                    rl.question('Quantidade de cotas: ', function(quantidade) {
                        if (!nome || !ticker || !pm || !quantidade) {
                            console.log('Os campos de nome, ticker, preço médio e quantidade devem ser preenchidos.');
                            return exibirMenu();
                        }

                        pm = pm.replace(',', '.');

                        const precoMedio = parseFloat(pm);
                        const quantidadeCotas = parseFloat(quantidade);

                        if (isNaN(precoMedio) || isNaN(quantidadeCotas)) {
                            console.log('Preço médio ou quantidade de ações inválidos.')
                            return exibirMenu();
                        }

                        const query = `INSERT INTO cripto (nome, ticker, pm, setor, quantidade) VALUES (?, ?, ?, ?, ?)`;
                        const values = [nome, ticker, precoMedio, setor, quantidadeCotas]; 

                        db.query(query, values, (err) => {
                            if (err) {
                                console.log('Erro ao cadastrar dados da criptomoeda: ', err.message);
                            } else {
                                console.log(`A criptomoeda ${nome} (${ticker}) foi cadastrada com sucesso!`);
                            }
                            exibirMenu();
                        });
                    });
                });
            });
        });
    });
}

const cadastrarRFSelic = function() {
    rl.question('Nome do ativo: ', function(nome) {
        rl.question('Preço médio de compra: ',function(pm) {
            rl.question('Data de vencimento (AAAA/MM/DD): ', function(vencimento) { // considerar usar uma biblioteca de validação de data
                rl.question('Quantidade de cotas: ', function(quantidade) {
                    rl.question('Taxa de juros: ', function(taxaJuros) {
                        if (!nome || !pm || !vencimento || !quantidade || !taxaJuros) {
                            console.log('Todos os campos devem ser preenchidos.');
                            return exibirMenu();
                        }

                        pm = pm.replace(',', '.');
                        quantidade = quantidade.replace(',', '.');
                        taxaJuros = taxaJuros.replace(',', '.');

                        const precoMedio = parseFloat(pm);
                        const quantidadeCotas = parseFloat(quantidade);
                        const juros = parseFloat(taxaJuros);

                        if (isNaN(precoMedio) || isNaN(quantidadeCotas) || isNaN(juros)) {
                            console.log('Preço médio, quantidade ou taxa de juros são inválidos.')
                            return exibirMenu();
                        }

                        const query = `INSERT INTO selic (nome, pm, vencimento, quantidade, taxaJuros) VALUES (?, ?, ?, ?, ?)`;
                        const values = [nome, precoMedio, vencimento, quantidadeCotas, juros]; 

                        db.query(query, values, (err) => {
                            if (err) {
                                console.log('Erro ao cadastrar dados do ativo de renda fixa: ', err.message);
                            } else {
                                console.log(`O ativo de renda fixa ${nome} da Selic foi cadastrado com sucesso!`);
                            }
                            exibirMenu();
                        });
                    });
                });
            });
        });
    });
}

const cadastrarRFIPCA = function() {
    rl.question('Nome do ativo: ', function(nome) {
        rl.question('Preço médio de compra: ',function(pm) {
            rl.question('Data de vencimento (AAAA/MM/DD): ', function(vencimento) { // considerar usar uma biblioteca de validação de data
                rl.question('Quantidade de cotas: ', function(quantidade) {
                    rl.question('Taxa de juros: ', function(taxaJuros) {
                        if (!nome || !pm || !vencimento || !quantidade || !taxaJuros) {
                            console.log('Todos os campos devem ser preenchidos.');
                            return exibirMenu();
                        }

                        pm = pm.replace(',', '.');
                        quantidade = quantidade.replace(',', '.');
                        taxaJuros = taxaJuros.replace(',', '.');

                        const precoMedio = parseFloat(pm);
                        const quantidadeCotas = parseFloat(quantidade);
                        const juros = parseFloat(taxaJuros);

                        if (isNaN(precoMedio) || isNaN(quantidadeCotas) || isNaN(juros)) {
                            console.log('Preço médio, quantidade ou taxa de juros são inválidos.')
                            return exibirMenu();
                        }

                        const query = `INSERT INTO ipca (nome, pm, vencimento, quantidade, taxaJuros) VALUES (?, ?, ?, ?, ?)`;
                        const values = [nome, precoMedio, vencimento, quantidadeCotas, juros]; 

                        db.query(query, values, (err) => {
                            if (err) {
                                console.log('Erro ao cadastrar dados do ativo de renda fixa: ', err.message);
                            } else {
                                console.log(`O ativo de renda fixa ${nome} de IPCA foi cadastrado com sucesso!`);
                            }
                            exibirMenu();
                        });
                    });
                });
            });
        });
    });
}

const cadastrarRFCDI = function() {
    rl.question('Nome do ativo: ', function(nome) {
        rl.question('Preço médio de compra: ',function(pm) {
            rl.question('Data de vencimento (AAAA/MM/DD): ', function(vencimento) { // considerar usar uma biblioteca de validação de data
                rl.question('Quantidade de cotas: ', function(quantidade) {
                    rl.question('Taxa de juros: ', function(taxaJuros) {
                        if (!nome || !pm || !vencimento || !quantidade || !taxaJuros) {
                            console.log('Todos os campos devem ser preenchidos.');
                            return exibirMenu();
                        }

                        pm = pm.replace(',', '.');
                        quantidade = quantidade.replace(',', '.');
                        taxaJuros = taxaJuros.replace(',', '.');

                        const precoMedio = parseFloat(pm);
                        const quantidadeCotas = parseFloat(quantidade);
                        const juros = parseFloat(taxaJuros);

                        if (isNaN(precoMedio) || isNaN(quantidadeCotas) || isNaN(juros)) {
                            console.log('Preço médio, quantidade ou taxa de juros são inválidos.')
                            return exibirMenu();
                        }

                        const query = `INSERT INTO cdi (nome, pm, vencimento, quantidade, taxaJuros) VALUES (?, ?, ?, ?, ?)`;
                        const values = [nome, precoMedio, vencimento, quantidadeCotas, juros]; 

                        db.query(query, values, (err) => {
                            if (err) {
                                console.log('Erro ao cadastrar dados do ativo de renda fixa: ', err.message);
                            } else {
                                console.log(`O ativo de renda fixa ${nome} de CDI foi cadastrado com sucesso!`);
                            }
                            exibirMenu();
                        });
                    });
                });
            });
        });
    });
}

exibirMenu();