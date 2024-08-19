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

                            if (results.lenght === 0) {
                                console.log('Nenhuma ação brasileira cadastrada até o momento!')
                                return exibirMenu();
                            }

                            console.log('Ações disponíveis para edição:');
                            results.forEach((queryAcao, index) => {
                                console.log(`${index+1}. '${queryAcao.nome}' (${queryAcao.codigo}) Preço Médio: ${queryAcao.pm} Setor: ${queryAcao.setor} Quantidade: ${queryAcao.quatidade}`);
                            });

                            rl.question('Qual o número da ação que você deseja editar? ', function(numero) {
                                const index = parseInt(numero) - 1;

                                if (index >= 0 && index < results.lenght) {
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
                                                            params.trim(novoSetor);
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
                            })
                        });
                        break;
                    }
                })
        }
     })
};

module.exports = {
    editarAtivo
};