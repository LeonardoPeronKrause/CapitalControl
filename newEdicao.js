'use strict';

const rl = require('./readline');
const db = require('./database');

// Função que exibe o menu principal de edição
function exibirMenu() {
    console.log('\n=== Menu de Edição ===');
    console.log('1. Editar Ações Brasileiras');
    console.log('2. Editar Fundos Imobiliários (FIIs)');
    console.log('3. Editar Ações Americanas');
    console.log('4. Editar Criptomoedas');
    console.log('5. Editar Ativos de Selic');
    console.log('6. Editar Ativos de IPCA');
    console.log('7. Editar Ativos de CDI');
    console.log('8. Sair');

    // Solicita a opção escolhida pelo usuário
    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                edicaoRendaVariavel('acoes', 'Ações Brasileiras');
                break;
            case '2':
                edicaoRendaVariavel('fii', 'Fundos Imobiliários');
                break;
            case '3':
                edicaoRendaVariavel('bdr', 'Ações Americanas');
                break;
            case '4':
                edicaoRendaVariavel('cripto', 'Criptomoedas');
                break;
            case '5':
                edicaoRendaFixa('selic', 'Selic');
                break;
            case '6':
                edicaoRendaFixa('ipca', 'IPCA');
                break;
            case '7':
                edicaoRendaFixa('cdi', 'CDI');
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

// Função para editar ativos de renda variável
function edicaoRendaVariavel(tabela, tipoAtivo) {
    // Query SQL para selecionar todos os registros da tabela especificada.
    const query = `SELECT * FROM ${tabela}`;

    // Executa a query no banco de dados
    db.query(query, (err, results) => {
        if (err) {
            console.log(`Erro ao buscar dados de ${tipoAtivo}!`, err.message);
            return exibirMenu();
        }

        // Verifica se a query retornou algum resultado.
        if (results.length === 0) {
            console.log(`Nenhum(a) ${tipoAtivo} cadastrado até o momento!`);
            return exibirMenu();
        }

        // Exibe os ativos disponíveis para edição
        console.log(`${tipoAtivo} disponíveis para edição:`);
        results.forEach((ativo, index) => {
            console.log(`${index + 1}. '${ativo.nome}' (${ativo.ticker}) Preço Médio: ${ativo.pm} Setor: ${ativo.setor} Quantidade: ${ativo.quantidade}`);
        });
        editarAtivoVariavelSelecionado(tabela, tipoAtivo, results);
    });
}

function edicaoRendaFixa(tabela, tipoAtivo) {
    const query = `SELECT * FROM ${tabela}`;

    db.query(query, (err, results) => {
        if (err) {
            console.log(`Erro ao buscar dados de ${tabela}!`, err.message);
            return exibirMenu();
        }

        if (results.length === 0) {
            console.log(`Nenhum ativo de ${tipoAtivo} cadastrado até o momento!`);
            return exibirMenu();
        }

        console.log(`Ativos de ${tipoAtivo} disponíveis para edição:`);
        results.forEach((ativo, index) => {
            console.log(`${index+1}. '${ativo.nome}' Preço Médio: ${ativo.pm} Vencimento: ${ativo.vencimento} Quantidade de cotas: ${ativo.quantidade} Taxa de Juros: ${ativo.taxaJuros}`);
        });
        editarAtivoFixoSelecionado(tabela, tipoAtivo, results);
    });
}

// Função para editar um ativo selecionado
function editarAtivoVariavelSelecionado(tabela, tipoAtivo, results) {
    // Pergunta ao usuário qual ativo deseja editar.
    rl.question('Qual o número do ativo que você deseja editar? ', function (numero) {
        const index = parseInt(numero) - 1; // Converte a entrada do usuário para um índice de array.

        // Verifica se o índice fornecido é válido.
        if (index >= 0 && index < results.length) {
            const ativoSelecionado = results[index]; // Seleciona o ativo correspondente ao índice.

            console.log('Se você deixar em branco, os valores não alterarão!');

            // Pergunta ao usuário pelos novos valores dos ativos.
            rl.question('Qual o novo nome do ativo? ', function (novoNome) {
                rl.question('Qual o novo TICKER do ativo? ', function (novoTicker) {
                    rl.question('Qual o novo preço médio? ', function (novoPm) {
                        rl.question('Qual o novo setor? ', function (novoSetor) {
                            rl.question('Qual a nova quantidade? ', function (novaQuantidade) {
                                const updates = []; // Array para armazenar as partes da query de atualização.
                                const params = []; // Array para armazenar os valores a serem atualizados.

                                // Adiciona a atualização do nome se o novo nome não estiver em branco.
                                if (novoNome.trim() !== '') {
                                    updates.push('nome = ?');
                                    params.push(novoNome);
                                }
                                // Adiciona a atualização do ticker se o novo ticker não estiver em branco.
                                if (novoTicker.trim() !== '') {
                                    updates.push('ticker = ?');
                                    params.push(novoTicker);
                                }

                                // Adiciona a atualização do pm se o novo pm não estiver em branco.
                                if (novoPm.trim() !== '') {
                                    updates.push('pm = ?');
                                    params.push(novoPm);
                                }

                                // Adiciona a atualização do setor se o novo setor não estiver em branco.
                                if (novoSetor.trim() !== '') {
                                    updates.push('setor = ?');
                                    params.push(novoSetor);
                                }

                                // Adiciona a atualização da quantidade se a nova quantidade não estiver em branco.
                                if (novaQuantidade.trim() !== '') {
                                    updates.push('quantidade = ?');
                                    params.push(novaQuantidade);
                                }

                                // Se houver atualizações a serem feitas, executa a query de atualização.
                                if (updates.length > 0) {
                                    params.push(ativoSelecionado.id); // Adiciona o ID do ativo à lista de parâmetros.
                                    const updateQuery = `UPDATE ${tabela} SET ${updates.join(', ')} WHERE id = ?`; // Monta a query de atualização.

                                    // Executa a query no banco de dados.
                                    db.query(updateQuery, params, (err) => {
                                        if (err) {
                                            console.log(`Erro ao atualizar ${tipoAtivo}: `, err.message);
                                        } else {
                                            console.log(`${tipoAtivo} atualizado com sucesso!`);
                                        }
                                        exibirMenu();
                                    });
                                } else {
                                    console.log('Nenhuma atualização realizada.'); // Mensagem se não houver atualizações.
                                    exibirMenu();
                                }
                            });
                        });
                    });
                });
            });
        } else {
            console.log('Número inválido. Tente novamente.'); // Mensagem de erro se o número do ativo for inválido.
            exibirMenu();
        }
    });
}

function editarAtivoFixoSelecionado(tabela, tipoAtivo, results) {
    rl.question('Qual o número do ativo que você deseja editar? ', function(numero) {
        const index = parseInt(numero) - 1;

        if (index >= 0 && index < results.length) {
            const ativoSelecionado = results[index];

            console.log('Se você deixar espaços em branco, os valores não alterarão!');

            rl.question('Qual o novo nome do ativo? ', function(novoNome) {
                rl.question('Qual o novo preço médio? ', function(novoPm) {
                    rl.question('Qual o novo vencimento? ', function(novoVencimento) {
                        rl.question('Qual a nova quantidade? ', function(novaQuantidade) {
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
                                    params.push(ativoSelecionado.id);
                                    const updateQuery = `UPDATE ${tabela} SET ${updates.join(', ')} WHERE id = ?`;

                                    db.query(updateQuery, params, (err) => {
                                        if (err) {
                                            console.log(`Erro ao atualizar ${tipoAtivo}: `, err.message);
                                        } else {
                                            console.log(`${tipoAtivo} atualizado com sucesso!`);
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
}

// Inicia o programa exibindo o menu
exibirMenu();
