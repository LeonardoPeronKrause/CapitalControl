'use strict';

const db = require('./database.js');
const rl = require('./readline.js');
const cadastro = require('./utils.js');
const menu = require('./apps.js');

const cadastrarAtivo = function() {
    rl.question('1. Renda Variável\n2. Renda Fixa\nQual a categoria de ativo que você deseja cadastrar? ', function(opcao) {
        switch (opcao) {
            case '1':
                rl.question('1. Ação Brasileira\n2. Fundo Imobiliário\n3. Ação Americana (BDR)\n4. Criptoativos\n Qual dos segmentos você deseja cadastrar? ', function(opcao) {
                    switch (opcao) {
                        case '1':
                            cadastrarAcaoBrasileira();
                            break;
                        case '2':
                            cadastrarFundoImobiliario();
                            break;                        
                        case '3':
                            cadastrarAcaoAmericana();
                            break;
                        case '4':
                            cadastrarCriptoativo();
                            break;
                        default:
                            console.log('Opção inválida. Tente novamente...');
                            cadastrarAtivo();
                            break;
                    }
                });
                break;
            case '2':
                rl.question('1. Selic\n2. IPCA\n3. CDI\nQual o indexador do seu investimento em renda fixa? ', function(opcao) {
                    switch (opcao) {
                        case '1':
                            cadastrarRFSelic();
                            break;
                        case '2':
                            cadastrarRFIPCA();
                            break;
                        case '3':
                            cadastrarRFCDI();
                            break;
                        default:
                            console.log('Opção inválida. Tente novamente...');
                            cadastrarAtivo();
                            break;
                    }
                });
                break;
            default:
                console.log('Opção inválida. Tente novamente...')
                cadastrarAtivo();
                break;
        }
    });
};

const cadastrarAcaoBrasileira = function() {
    // Define as perguntas a serem feitas para o usuário
    const perguntas = [
        'Nome da ação: ',
        'Código da ação: (EX: PETR3) ',
        'Preço médio de compra: ',
        'Setor: ',
        'Quantidade de ações: '
    ];

    // Usa a função perguntarDados para coletar as respostas do usuário
    cadastro.perguntarDados(perguntas, function(respostas) {
        // Desestrutura as respostas em variáveis individuais
        const [nome, ticker, pm, setor, quantidade] = respostas;

        // Verifica se todos os campos foram preenchidos
        if (!nome || !ticker || !pm || !setor || !quantidade) {
            console.log('Todos os campos precisam ser preenchidos');
            return exibirMenu(); // Retorna ao menu se algum campo estiver vazio
        }

         // Substitui a vírgula por ponto no preço médio para tratar como número
        const precoMedio = parseFloat(pm.replace(',', '.'));
        const quantidadeCotas = parseInt(quantidade);

        // Verifica se a conversão para número foi bem-sucedida
        if (isNaN(precoMedio) || isNaN(quantidadeCotas)) {
            console.log('Preço médio ou quantidade de ações inválidos.')
            return exibirMenu(); // Retorna ao menu se os valores forem inválidos
        }

        // Define a consulta SQL para inserir os dados do banco de dados
        const query = `INSERT INTO acoes (nome, ticker, pm, setor, quantidade) VALUES ($1, $2, $3, $4, $5)`;
        const values = [nome, ticker, precoMedio, setor, quantidadeCotas]; 

        // Usa a função executarQuery para executar a consulta no banco de dados
        executarQuery(query, values, `A ação ${nome} (${ticker}) foi cadastrada com sucesso!`, menu.exibirMenu);
    });
};

const cadastrarFundoImobiliario = function() {
    const perguntas = [
        'Nome do fundo imobiliário: ',
        'Ticker: (EX: MXRF11) ',
        'Preço médio de compra: ',
        'Setor: ',
        'Quantidade de cotas: '
    ];

    cadastro.perguntarDados(perguntas, function(respostas) {
        const [nome, ticker, pm, setor, quantidade] = respostas;
    
        if (!nome || !ticker || !pm || !setor || !quantidade) {
            console.log('Todos os campos precisam ser preenchidos');
            return exibirMenu();
        }

        const precoMedio = parseFloat(pm.replace(',', '.'));
        const quantidadeCotas = parseInt(quantidade);

        if (isNaN(precoMedio) || isNaN(quantidadeCotas)) {
            console.log('Preço médio ou quantidade de ações inválidos.')
            return exibirMenu();
        }

        const query = `INSERT INTO fii (nome, ticker, pm, setor, quantidade) VALUES ($1, $2, $3, $4, $5)`;
        const values = [nome, ticker, precoMedio, setor, quantidadeCotas];   
        
        cadastro.executarQuery(query, values, `O fundo imobiliário ${nome} (${ticker}) foi cadastrado com sucesso!`, menu.exibirMenu);
    });
};

const cadastrarAcaoAmericana = function() {
    const respostas = [
        'Nome da ação: ',
        'Ticker: (APPL34) ',
        'Preço médio de compra: ',
        'Setor: ',
        'Quantidade de cotas: '
    ];

    cadastro.perguntarDados(perguntas, function(respostas) {
        const [nome, ticker, pm, setor, quantidade] = respostas;

        if (!nome || !ticker || !pm || !setor || !quantidade) {
            console.log('Todos os campos precisam ser preenchidos');
            return exibirMenu();
        }

        const precoMedio = parseFloat(pm.replace(',', '.'));
        const quantidadeCotas = parseInt(quantidade);

        if (isNaN(precoMedio) || isNaN(quantidadeCotas)) {
            console.log('Preço médio ou quantidade de ações inválidos.')
            return exibirMenu();
        }

        const query = `INSERT INTO fii (nome, ticker, pm, setor, quantidade) VALUES ($1, $2, $3, $4, $5)`;
        const values = [nome, ticker, precoMedio, setor, quantidadeCotas];   
        
        cadastro.executarQuery(query, values, `A ação ${nome} (${ticker}) foi cadastrada com sucesso!`, menu.exibirMenu);
    });
};

const cadastrarCriptoativo = function() {
    const respostas = [
        'Nome do criptoativo: ',
        'Ticker: (EX: BTC)',
        'Preço médio de compra: ',
        'Setor: (opcional) ',
        'Quantidade: '
    ];

    cadastro.perguntarDados(perguntas, function(respostas) {
        const [nome, ticker, pm, setor, quantidade] = respostas;

        if (!nome || !ticker || !pm || !quantidade) {
            console.log('Os campos de nome, ticker, preço médio e quantidade devem ser preenchidos.');
            return exibirMenu();
        }
        
        const precoMedio = parseFloat(pm.replace(',', '.'));
        const quantidadeCotas = parseFloat(quantidade);

        if (isNaN(precoMedio) || isNaN(quantidadeCotas)) {
            console.log('Preço médio ou quantidade de ações inválidos.')
            return exibirMenu();
        }

        const query = `INSERT INTO cripto (nome, ticker, pm, setor, quantidade) VALUES ($1, $2, $3, $4, $5)`;
        const values = [nome, ticker, precoMedio, setor, quantidadeCotas]; 

        cadastro.executarQuery(query, values, `O criptoativo ${nome} (${ticker}) foi cadastrado com sucesso!`, menu.exibirMenu);
    });
};

/* const cadastrarCriptoativo = function() {
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

                        const query = `INSERT INTO cripto (nome, ticker, pm, setor, quantidade) VALUES ($1, $2, $3, $4, $5)`;
                        const values = [nome, ticker, precoMedio, setor, quantidadeCotas]; 

                        console.log('Executando a consulta: ', query, values);

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
};*/

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

                        const query = `INSERT INTO selic (nome, pm, vencimento, quantidade, taxaJuros) VALUES ($1, $2, $3, $4, $5)`;
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
};

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

                        const query = `INSERT INTO ipca (nome, pm, vencimento, quantidade, taxaJuros) VALUES ($1, $2, $3, $4, $5)`;
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
};

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

                        const query = `INSERT INTO cdi (nome, pm, vencimento, quantidade, taxaJuros) VALUES ($1, $2, $3, $4, $5)`;
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
};

module.exports = {
    cadastrarAtivo,
    cadastrarAcaoBrasileira,
    cadastrarFundoImobiliario,
    cadastrarAcaoAmericana,
    cadastrarCriptoativo,
    cadastrarRFSelic,
    cadastrarRFIPCA,
    cadastrarRFCDI
};