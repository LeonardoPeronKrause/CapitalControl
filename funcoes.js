'use strict';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const exibirMenu = function () {
    rl.question('1. Cadastrar um novo ativo. \n2. Editar ativos.\n3. Visualizar Ativos.\n4. Excluir Ativo. \n5. Fazer Backup\n6. Sair.\n\n Qual opção você deseja utilizar? ', function (opcao) {
        if (opcao === '1') {
            cadastrarAtivo();
        } else if (opcao === '2') {
            editarAtivo();
        } else if (opcao === '3') {
            verAtivos();
        } else if (opcao === '4') {
            excluirAtivo();
        } else if (opcao === '5') {
            fazerBackup();
        } else if (opcao === '6') {
            sair();
        } else {
            console.log('Opção inválida. Tente novamente...')
            exibirMenu();
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
    console.log('Função de ver ativos ainda não implementada.');
    exibirMenu(); 
};

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
                        const quantidadeAcoes = parseInt(quantidade);

                        if (isNaN(precoMedio) || isNaN(quantidadeAcoes)) {
                            console.log('Preço médio ou quantidade de ações inválidos.')
                            return exibirMenu();
                        }

                        const query = `INSERT INTO acoes (nome, ticker, pm, setor, quantidade) VALUES (?, ?, ?, ?, ?)`;
                        const values = [nome, ticker, precoMedio, setor, quantidadeAcoes]; 

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
    console.log('Função cadastrar fundo imobiliario ainda não implementada.');
    exibirMenu();
}

const cadastrarAcaoAmericana = function() {
    console.log('Função cadastrar ação americana ainda não implementada.');
    exibirMenu();
}

const cadastrarCriptoativo = function() {
    console.log('Função cadastrar criptoativo ainda não implementada.');
    exibirMenu();
}

const cadastrarRFSelic = function() {
    console.log('Função cadastrar renda fixa indexada na selic ainda não implementada.');
    exibirMenu();
}

const cadastrarRFIPCA = function() {
    console.log('Função cadastrar renda fixa indexada no IPCA ainda não implementada.');
    exibirMenu();
}

const cadastrarRFCDI = function() {
    console.log('Função cadastrar renda fixa indexada no CDI ainda não implementada.');
    exibirMenu();
}

const cadastrarRFPIB = function() {
    console.log('Função cadastrar renda fixa indexada no PIB ainda não implementada.');
    exibirMenu();
}

const cadastrarRFDolar = function() {
    console.log('Função cadastrar renda fixa indexada no dolar ainda não implementada.');
    exibirMenu();
}

exibirMenu();