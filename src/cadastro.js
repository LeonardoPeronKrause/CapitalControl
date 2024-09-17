'use strict';

const db = require('./database.js');
const rl = require('./readline.js');
const { perguntarDados } = require('./utils.js');
const { iniciarMenu } = require('./menu.js');

const cadastrarAtivo = function(callback) {
    rl.question('1. Renda Variável\n2. Renda Fixa\nQual a categoria de ativo que você deseja cadastrar? ', function(opcao) {
        switch (opcao) {
            case '1':
                rl.question('1. Ação Brasileira\n2. Fundo Imobiliário\n3. Ação Americana (BDR)\n4. Criptoativos\n Qual dos segmentos você deseja cadastrar? ', function(opcao) {
                    switch (opcao) {
                        case '1':
                            cadastrarAcaoBrasileira(callback);
                            break;
                        case '2':
                            cadastrarFundoImobiliario(callback);
                            break;                        
                        case '3':
                            cadastrarAcaoAmericana(callback);
                            break;
                        case '4':
                            cadastrarCriptoativo(callback);
                            break;
                        default:
                            console.log('Opção inválida. Tente novamente...');
                            cadastrarAtivo(callback);
                            break;
                    }
                });
                break;
            case '2':
                rl.question('1. Selic\n2. IPCA\n3. CDI\nQual o indexador do seu investimento em renda fixa? ', function(opcao) {
                    switch (opcao) {
                        case '1':
                            cadastrarRFSelic(callback);
                            break;
                        case '2':
                            cadastrarRFIPCA(callback);
                            break;
                        case '3':
                            cadastrarRFCDI(callback);
                            break;
                        default:
                            console.log('Opção inválida. Tente novamente...');
                            cadastrarAtivo(callback);
                            break;
                    }
                });
                break;
            default:
                console.log('Opção inválida. Tente novamente...')
                cadastrarAtivo(callback);
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
    perguntarDados(perguntas, function(respostas) {
        // Desestrutura as respostas em variáveis individuais
        let [nome, ticker, pm, setor, quantidade] = respostas;

        // Verifica se todos os campos foram preenchidos
        if (!nome || !ticker || !pm || !setor || !quantidade) {
            console.log('Todos os campos precisam ser preenchidos');
            return iniciarMenu(); // Retorna ao menu se algum campo estiver vazio
        }

        // Convertendo os valores para maiusculo para não dar problemas no db
        nome = nome.toUpperCase();
        ticker = ticker.toUpperCase();
        setor = setor.toUpperCase();

         // Substitui a vírgula por ponto no preço médio para tratar como número
        const precoMedio = parseFloat(pm.replace(',', '.'));
        const quantidadeCotas = parseInt(quantidade);

        // Verifica se a conversão para número foi bem-sucedida
        if (isNaN(precoMedio) || isNaN(quantidadeCotas)) {
            console.log('Preço médio ou quantidade de ações inválidos.')
            return iniciarMenu(); // Retorna ao menu se os valores forem inválidos
        }

        // Define a consulta SQL para inserir os dados do banco de dados
        const query = `INSERT INTO acoes (nome, ticker, pm, setor, quantidade) VALUES ($1, $2, $3, $4, $5)`;
        const values = [nome, ticker, precoMedio, setor, quantidadeCotas]; 

        // Usa a função executarQuery para executar a consulta no banco de dados
        db.executarQuery(query, values, `A ação ${nome} (${ticker}) foi cadastrada com sucesso!`, iniciarMenu);
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

    perguntarDados(perguntas, function(respostas) {
        let [nome, ticker, pm, setor, quantidade] = respostas;
    
        if (!nome || !ticker || !pm || !setor || !quantidade) {
            console.log('Todos os campos precisam ser preenchidos');
            return iniciarMenu();
        }

        // Convertendo os valores para maiusculo para não dar problemas no db
        nome = nome.toUpperCase();
        ticker = ticker.toUpperCase();
        setor = setor.toUpperCase();

        const precoMedio = parseFloat(pm.replace(',', '.'));
        const quantidadeCotas = parseInt(quantidade);

        if (isNaN(precoMedio) || isNaN(quantidadeCotas)) {
            console.log('Preço médio ou quantidade de ações inválidos.')
            return iniciarMenu();
        }

        const query = `INSERT INTO fii (nome, ticker, pm, setor, quantidade) VALUES ($1, $2, $3, $4, $5)`;
        const values = [nome, ticker, precoMedio, setor, quantidadeCotas];   
        
        db.executarQuery(query, values, `O fundo imobiliário ${nome} (${ticker}) foi cadastrado com sucesso!`, iniciarMenu);
    });
};

const cadastrarAcaoAmericana = function() {
    const perguntas = [
        'Nome da ação: ',
        'Ticker: (APPL34) ',
        'Preço médio de compra: ',
        'Setor: ',
        'Quantidade de cotas: '
    ];

    perguntarDados(perguntas, function(respostas) {
        let [nome, ticker, pm, setor, quantidade] = respostas;

        if (!nome || !ticker || !pm || !setor || !quantidade) {
            console.log('Todos os campos precisam ser preenchidos');
            return iniciarMenu();
        }

        // Convertendo os valores para maiusculo para não dar problemas no db
        nome = nome.toUpperCase();
        ticker = ticker.toUpperCase();
        setor = setor.toUpperCase();

        const precoMedio = parseFloat(pm.replace(',', '.'));
        const quantidadeCotas = parseInt(quantidade);

        if (isNaN(precoMedio) || isNaN(quantidadeCotas)) {
            console.log('Preço médio ou quantidade de ações inválidos.')
            return iniciarMenu();
        }

        const query = `INSERT INTO bdr (nome, ticker, pm, setor, quantidade) VALUES ($1, $2, $3, $4, $5)`;
        const values = [nome, ticker, precoMedio, setor, quantidadeCotas];   
        
        db.executarQuery(query, values, `A ação ${nome} (${ticker}) foi cadastrada com sucesso!`, iniciarMenu);
    });
};

const cadastrarCriptoativo = function() {
    const perguntas = [
        'Nome do criptoativo: ',
        'Ticker: (EX: BTC) ',
        'Preço médio de compra: ',
        'Setor: (opcional) ',
        'Quantidade: '
    ];

    perguntarDados(perguntas, function(respostas) {
        let [nome, ticker, pm, setor, quantidade] = respostas;

        if (!nome || !ticker || !pm || !quantidade) {
            console.log('Os campos de nome, ticker, preço médio e quantidade devem ser preenchidos.');
            return iniciarMenu();
        }

        // Convertendo os valores para maiusculo para não dar problemas no db
        nome = nome.toUpperCase();
        ticker = ticker.toUpperCase();
        setor = setor.toUpperCase();
        
        const precoMedio = parseFloat(pm.replace(',', '.'));
        const quantidadeCotas = parseFloat(quantidade);

        if (isNaN(precoMedio) || isNaN(quantidadeCotas)) {
            console.log('Preço médio ou quantidade de ações inválidos.')
            return iniciarMenu();
        }

        const query = `INSERT INTO cripto (nome, ticker, pm, setor, quantidade) VALUES ($1, $2, $3, $4, $5)`;
        const values = [nome, ticker, precoMedio, setor, quantidadeCotas]; 

        db.executarQuery(query, values, `O criptoativo ${nome} (${ticker}) foi cadastrado com sucesso!`, iniciarMenu);
    });
};

const cadastrarRFSelic = function() {
    const perguntas = [
        'Nome do Ativo: ',
        'Preço médio de compra: ',
        'Data de vencimento: ',
        'Quantidade de cotas: ',
        'Taxa de juros: '
    ]

    perguntarDados(perguntas, function(respostas) {
        let [nome, pm, vencimento, quantidade, taxaJuros] = respostas;

        if (!nome || !pm || !vencimento || !taxaJuros) {
            console.log('Os campos de nome, preço médio, vencimento e taxa de juros devem ser preenchidos!');
            return iniciarMenu();
        }

        // Convertendo os valores para maiusculo para não dar problemas no db
        nome = nome.toUpperCase();

        const precoMedio = parseFloat(pm.replace(',', '.'));
        const quantidadeCotas = quantidade ? parseFloat(quantidade.replace(',', '.')) : 1;
        const juros = parseFloat(taxaJuros.replace(',', '.').replace('%', ''));

        if (isNaN(precoMedio) || isNaN(quantidadeCotas) || isNaN(juros)) {
            console.log('Preço médio, quantidade ou taxa de juros são inválidos, digite  apenas números!')
            return iniciarMenu();
        }

        const query = `INSERT INTO selic (nome, pm, vencimento, quantidade, taxaJuros) VALUES ($1, $2, $3, $4, $5)`;
        const values = [nome, precoMedio, vencimento, quantidadeCotas, juros]; 

        db.executarQuery(query, values, `A aplicação em Selic ${nome} foi cadastrada com sucesso!`, iniciarMenu);
    });
};

const cadastrarRFIPCA = function() {
    const perguntas = [
        'Nome do Ativo: ',
        'Preço médio de compra: ',
        'Data de vencimento: ',
        'Quantidade de cotas: ',
        'Taxa de juros: '
    ];

    perguntarDados(perguntas, function(respostas) {
        let [nome, pm, vencimento, quantidade, taxaJuros] = respostas;

        if (!nome || !pm || !vencimento || !taxaJuros) {
            console.log('Os campos de nome, preço médio, vencimento e taxa de juros devem ser preenchidos!');
            return iniciarMenu();  // Chama a função corretamente
        }

        // Convertendo os valores para maiusculo para não dar problemas no db
        nome = nome.toUpperCase();

        const precoMedio = parseFloat(pm.replace(',', '.'));
        const quantidadeCotas = quantidade ? parseFloat(quantidade.replace(',', '.')) : 1;
        const juros = parseFloat(taxaJuros.replace(',', '.').replace('%', ''));

        if (isNaN(precoMedio) || isNaN(quantidadeCotas) || isNaN(juros)) {
            console.log('Preço médio, quantidade ou taxa de juros são inválidos, digite  apenas números!');
            return iniciarMenu();
        }

        const query = `INSERT INTO ipca (nome, pm, vencimento, quantidade, taxaJuros) VALUES ($1, $2, $3, $4, $5)`;
        const values = [nome, precoMedio, vencimento, quantidade, juros];

        db.executarQuery(query, values, `A aplicação em IPCA ${nome}`, iniciarMenu);
    });
};

const cadastrarRFCDI = function() {
    const perguntas = [
        'Nome do ativo: ',
        'Preço médio de compra: ',
        'Data de vencimento: ',
        'Quantidade de cotas: ',
        'Taxa de juros: '
    ];

    perguntarDados(perguntas, function(respostas) {
        let [nome, pm, vencimento, quantidade, taxaJuros] = respostas;

        if (!nome || !pm || !vencimento || !taxaJuros) {
            console.log('Os campos de nome, preço médio, vencimento e taxa de juros devem ser preenchidos!');
            return iniciarMenu();
        }

        // Convertendo os valores para maiusculo para não dar problemas no db
        nome = nome.toUpperCase();

        const precoMedio = parseFloat(pm.replace(',', '.'));
        const quantidadeCotas = quantidade ? parseFloat(quantidade.replace(',', '.')) : 1;
        const juros = parseFloat(taxaJuros.replace(',', '.').replace('%', ''));

        if (isNaN(precoMedio) || isNaN(quantidadeCotas) || isNaN(juros)) {
            console.log('Preço médio, quantidade e taxa de juros, devem ser números!');
            return iniciarMenu();
        }

        const query = `INSERT INTO cdi (nome, pm, vencimento, quantidade, taxaJuros) VALUES ($1, $2, $3, $4, $5)`;
        const values = [nome, precoMedio, vencimento, quantidadeCotas, juros];

        db.executarQuery(query, values, `A aplicação em CDI ${nome} foi cadastrada com sucesso!`, iniciarMenu);
    }) ;
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
