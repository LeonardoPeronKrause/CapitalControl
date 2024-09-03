'use strict';

// Importa os módulos necessários
const rl = require('./readline'); // Módulo para leitura de entradas do usuário
const db = require('./database'); // Módulo para interação com o banco de dados

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
                edicaoRendaVariavel('acoes', 'Ações Brasileiras'); // Edita ações brasileiras
                break;
            case '2':
                edicaoRendaVariavel('fii', 'Fundos Imobiliários'); // Edita FIIs
                break;
            case '3':
                edicaoRendaVariavel('bdr', 'Ações Americanas'); // Edita ações americanas
                break;
            case '4':
                edicaoRendaVariavel('cripto', 'Criptomoedas'); // Edita criptomoedas
                break;
            case '5':
                edicaoRendaFixa('selic', 'Selic'); // Edita ativos de Selic
                break;
            case '6':
                edicaoRendaFixa('ipca', 'IPCA'); // Edita ativos de IPCA
                break;
            case '7':
                edicaoRendaFixa('cdi', 'CDI'); // Edita ativos de CDI
                break;
            case '8':
                console.log('Até logo, Investidor!'); // Mensagem de despedida
                rl.close(); // Fecha a leitura
                break;
            default:
                console.log('Opção inválida. Tente novamente.'); // Mensagem de erro
                exibirMenu(); // Exibe o menu novamente
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
            console.log(`Erro ao buscar dados de ${tipoAtivo}!`, err.message); // Mensagem de erro
            return exibirMenu(); // Retorna ao menu
        }

        // Verifica se a query retornou algum resultado.
        if (results.length === 0) {
            console.log(`Nenhum(a) ${tipoAtivo} cadastrado até o momento!`); // Mensagem caso não haja resultados
            return exibirMenu(); // Retorna ao menu
        }

        // Exibe os ativos disponíveis para edição
        console.log(`${tipoAtivo} disponíveis para edição:`);
        results.forEach((ativo, index) => {
            console.log(`${index + 1}. '${ativo.nome}' (${ativo.ticker}) Preço Médio: ${ativo.pm} Setor: ${ativo.setor} Quantidade: ${ativo.quantidade}`);
        });
        editarAtivoVariavelSelecionado(tabela, tipoAtivo, results); // Chama a função para editar o ativo selecionado
    });
}

// Função para editar ativos de renda fixa
function edicaoRendaFixa(tabela, tipoAtivo) {
    const query = `SELECT * FROM ${tabela}`;

    db.query(query, (err, results) => {
        if (err) {
            console.log(`Erro ao buscar dados de ${tabela}!`, err.message); // Mensagem de erro
            return exibirMenu(); // Retorna ao menu
        }

        if (results.length === 0) {
            console.log(`Nenhum ativo de ${tipoAtivo} cadastrado até o momento!`); // Mensagem caso não haja resultados
            return exibirMenu(); // Retorna ao menu
        }

        console.log(`Ativos de ${tipoAtivo} disponíveis para edição:`);
        results.forEach((ativo, index) => {
            console.log(`${index+1}. '${ativo.nome}' Preço Médio: ${ativo.pm} Vencimento: ${ativo.vencimento} Quantidade de cotas: ${ativo.quantidade} Taxa de Juros: ${ativo.taxaJuros}`);
        });
        editarAtivoFixoSelecionado(tabela, tipoAtivo, results); // Chama a função para editar o ativo selecionado
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

            console.log('Se você deixar em branco, os valores não alterarão!'); // Mensagem informativa

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
                                            console.log(`Erro ao atualizar ${tipoAtivo}: `, err.message); // Mensagem de erro
                                        } else {
                                            console.log(`${tipoAtivo} atualizado com sucesso!`); // Mensagem de sucesso
                                        }
                                        exibirMenu(); // Retorna ao menu
                                    });
                                } else {
                                    console.log('Nenhuma atualização realizada.'); // Mensagem se não houver atualizações.
                                    exibirMenu(); // Retorna ao menu
                                }
                            });
                        });
                    });
                });
            });
        } else {
            console.log('Número inválido. Tente novamente.'); // Mensagem de erro se o número do ativo for inválido.
            exibirMenu(); // Retorna ao menu
        }
    });
}

// Função para editar um ativo de renda fixa selecionado
function editarAtivoFixoSelecionado(tabela, tipoAtivo, results) {
    rl.question('Qual o número do ativo que você deseja editar? ', function(numero) {
        const index = parseInt(numero) - 1; // Converte a entrada do usuário para um índice de array.

        if (index >= 0 && index < results.length) {
            const ativoSelecionado = results[index]; // Seleciona o ativo correspondente ao índice.

            console.log('Se você deixar espaços em branco, os valores não alterarão!'); // Mensagem informativa

            // Pergunta ao usuário pelos novos valores dos ativos de renda fixa.
            rl.question('Qual o novo nome do ativo? ', function(novoNome) {
                rl.question('Qual o novo preço médio? ', function(novoPm) {
                    rl.question('Qual a nova data de vencimento? ', function(novoVencimento) {
                        rl.question('Qual a nova quantidade de cotas? ', function(novaQuantidade) {
                            rl.question('Qual a nova taxa de juros? ', function(novaTaxa) {
                                const updates = []; // Array para armazenar as partes da query de atualização.
                                const params = []; // Array para armazenar os valores a serem atualizados.

                                // Adiciona a atualização do nome se o novo nome não estiver em branco.
                                if (novoNome.trim() !== '') {
                                    updates.push('nome = ?');
                                    params.push(novoNome);
                                }
                                // Adiciona a atualização do preço médio se o novo preço não estiver em branco.
                                if (novoPm.trim() !== '') {
                                    updates.push('pm = ?');
                                    params.push(novoPm);
                                }
                                // Adiciona a atualização da data de vencimento se a nova data não estiver em branco.
                                if (novoVencimento.trim() !== '') {
                                    updates.push('vencimento = ?');
                                    params.push(novoVencimento);
                                }
                                // Adiciona a atualização da quantidade se a nova quantidade não estiver em branco.
                                if (novaQuantidade.trim() !== '') {
                                    updates.push('quantidade = ?');
                                    params.push(novaQuantidade);
                                }
                                // Adiciona a atualização da taxa de juros se a nova taxa não estiver em branco.
                                if (novaTaxa.trim() !== '') {
                                    updates.push('taxaJuros = ?');
                                    params.push(novaTaxa);
                                }

                                // Se houver atualizações a serem feitas, executa a query de atualização.
                                if (updates.length > 0) {
                                    params.push(ativoSelecionado.id); // Adiciona o ID do ativo à lista de parâmetros.
                                    const updateQuery = `UPDATE ${tabela} SET ${updates.join(', ')} WHERE id = ?`; // Monta a query de atualização.

                                    // Executa a query no banco de dados.
                                    db.query(updateQuery, params, (err) => {
                                        if (err) {
                                            console.log(`Erro ao atualizar ${tipoAtivo}: `, err.message); // Mensagem de erro
                                        } else {
                                            console.log(`${tipoAtivo} atualizado com sucesso!`); // Mensagem de sucesso
                                        }
                                        exibirMenu(); // Retorna ao menu
                                    });
                                } else {
                                    console.log('Nenhuma atualização realizada.'); // Mensagem se não houver atualizações.
                                    exibirMenu(); // Retorna ao menu
                                }
                            });
                        });
                    });
                });
            });
        } else {
            console.log('Número inválido. Tente novamente.'); // Mensagem de erro se o número do ativo for inválido.
            exibirMenu(); // Retorna ao menu
        }
    });
}

// Exporta a função de exibição do menu para ser usada em outros módulos
module.exports = {
    exibirMenu
}
