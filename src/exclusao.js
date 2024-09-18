'use strict';

const rl = require('./readline');
const db = require('./database');
const { iniciarMenu } = require('./menu');

function exclusaoRendaVariavel(tabela, tipoAtivo) {
    const query = `SELECT * FROM ${tabela}`;

    db.query(query, (err, results) => {
        if (err) {
            console.log(`Erro ao buscar dados de ${tipoAtivo}!`, err.message);
            return iniciarMenu();
        }

        if (results.rows.length === 0) {
            console.log(`Nenhum(a) ${tipoAtivo} cadastrado até o momento!`);
            return iniciarMenu();
        }

        console.log(`${tipoAtivo} disponíveis para edição:`);
        results.rows.forEach((ativo, index) => {
            console.log(`${index + 1} '${ativo.nome}' (${ativo.ticker}) Preço Médio: ${ativo.pm} Setor: ${ativo.setor} Quantidade: ${ativo.quantidade}`);
        });
        excluirAtivoVariavelSelecionado(tabela, tipoAtivo, results);
    });
}

function exclusaoRendaFixa(tabela, tipoAtivo) {
    const query = `SELECT * FROM ${tabela}`;

    db.query(query, (err, results) => {
        if (err) {
            console.log(`Erro ao buscar dados de ${tipoAtivo}`);
            return iniciarMenu();
        }

        if (results.rows.length === 0) {
            console.log(`Nenhum ativo de ${tipoAtivo} cadastrado até o momento!`);
            return iniciarMenu();
        }

        console.log(`Ativos de ${tipoAtivo} disponíveis para exclusão:`);
        results.rows.forEach((ativo, index) => {
            console.log(`${index + 1}. '${ativo.nome}' Preço Médio: ${ativo.pm} Vencimento: ${ativo.vencimento} Quantidade de Cotas: ${ativo.quantidade} Taxa de Juros: ${ativo.taxaJuros}`);
        });
        excluirAtivoFixoSelecionado(tabela, tipoAtivo, results);
    });
}

function excluirAtivoVariavelSelecionado(tabela, tipoAtivo, results) {
    rl.question('Qual o número do ativo que você deseja excluir? ', function(numero) {
        if (numero.trim() === '') {
            console.log('Nenhum ativo excluído!');
            return iniciarMenu();
        }

        const index = parseInt(numero) - 1;

        if (index >= 0 && index < results.rows.length) {
            const ativoSelecionado = results.rows[index];

            rl.question(`Você tem certeza que deseja excluir o ativo ${ativoSelecionado.nome}? [Use = S para sim/N para não]: `, function(confirmacao) {
                if (confirmacao.toUpperCase() === 'S') {
                    const deleteQuery = `DELETE FROM ${tabela} WHERE id = ?`;
                    db.query(deleteQuery, [ativoSelecionado.id], (err) => {
                        if (err) {
                            console.log('Erro ao excluir o ativo!', err.message);
                        } else {
                            console.log(`O investimento no ativo ${ativoSelecionado.nome} foi excluído com sucesso!`);
                        }
                        iniciarMenu();
                    });
                } else if (confirmacao.toUpperCase() === 'N') {
                    console.log('Nenhum ativo excluído!');
                    iniciarMenu();
                } else {
                    console.log('Você digitou algo diferente de "S" para sim ou "N" para não');
                    iniciarMenu();
                }
            });
        } else {
            console.log('Número inválido.');
            iniciarMenu();
        }
    });
}

function excluirAtivoFixoSelecionado(tabela, tipoAtivo, results) {
    rl.question('Qual o número do ativo que você deseja excluir? ', function(numero) {
        if (numero.trim() === '') {
            console.log('Nenhum ativo excluído!');
            return iniciarMenu();
        }

        const index = parseInt(numero) - 1;

        if (index >= 0 && index < results.rows.length) {
            const ativoSelecionado = results.rows[index];

            rl.question(`Você tem certeza que deseja excluir o investimento ${ativoSelecionado.nome} de ${tipoAtivo}? [Use S para sim/N para não]: `, function(confirmacao) {
                if (confirmacao.toUpperCase() === 'S') {
                    const deleteQuery = `DELETE FROM ${tabela} WHERE ID = ?`;
                    db.query(deleteQuery, [ativoSelecionado.id], (err) => {
                        if (err) {
                            console.log('Erro ao excluir o ativo!', err.message);
                        } else {
                            console.log(`O investimento ${ativoSelecionado.nome} em ${tabela} foi excluúdo com sucesso!`);
                        }
                        iniciarMenu();
                    });
                } else if (confirmacao.toUpperCase() === 'N') {
                    console.log('Nenhum ativo excluído!');
                    iniciarMenu();
                } else {
                    console.log('Nenhum ativo excluído!');
                    iniciarMenu();
                }
            });
        } else {
            console.log('Número inválido.');
            iniciarMenu();
        }
    });
}

module.exports = {
    exclusaoRendaVariavel,
    exclusaoRendaFixa,
    excluirAtivoFixoSelecionado,
    excluirAtivoVariavelSelecionado
}
