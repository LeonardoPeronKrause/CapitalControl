'use strict';

const yahooFinance = require('yahoo-finance2').default;
const { iniciarMenu } = require('./menu');
const rl = require('./readline.js');

// Função para buscar o preço atual da ação
async function consultaPrecoAtual() {
    rl.question('Digite o TICKER  da ação (ex: PETR3): ', async function (ticker) {
        const cotacaoAtual = await buscarCotacao(ticker);
        if (cotacaoAtual) {
            console.log(`Preço atuial de ${ticker}: R$ ${cotacaoAtual}`);
        } else {
            console.log('Não possível obter o preço atual');
        }
        iniciarMenu();
    });
}

// Função p buscar cotação de uma ação
async function buscarCotacao(ticker) {
   try {
       const resultado = await yahooFinance.quote(ticker + ".SA");
       return resultado.regularMarketPrice;
   } catch (error) {
       console.error('Error ao buscar cotação: ', error);
       return null;
   }
}

// Exemplo de uso
async function exibirAtivo(ativo) {
    console.log(`Nome da ação: ${ativo.nome}`);
    console.log(`Ticker: ${ativo.ticker}`);

    const cotacaoAtual = await buscarCotacao(ativo.ticker);
    if (cotacaoAtual) {
        console.log(`Preço atual: R$ ${cotacaoAtual}`);
    } else {
        console.log('Não foi possível obter o preço atual.');
    }
}

module.exports = { buscarCotacao };
