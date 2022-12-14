// https://api.coinbase.com/v2/prices/LTC-USD/sell
const coinBase = 'https://api.coinbase.com/v2/prices/LTC-USD/sell';

// Array to store coin prices in order of coinbase, coingecko, kraken, binance, gemini
var ltcPrices = [];

// FETCH COINBASE PRICE
fetch(coinBase)
    .then((resp) => resp.json())
    .then(function (coinData) {
        console.log(coinData.data.amount + " Coinbase");
        ltcPrices[0] = parseFloat(coinData.data.amount);
    })
    .catch(function (error) {
        console.log(error);
    });

    