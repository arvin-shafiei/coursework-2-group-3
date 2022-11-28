// https://api.coinbase.com/v2/prices/LTC-USD/sell
// https://api.coingecko.com/api/v3/coins/litecoin?tickers=true
// https://api.kraken.com/0/public/Ticker?pair=LTCUSD
// https://www.binance.com/api/v3/ticker/price?symbol=LTCUSDT
// https://api.gemini.com/v1/pubticker/ltcusd

const coinBase = 'https://api.coinbase.com/v2/prices/LTC-USD/sell';
const coinGecko = 'https://api.coingecko.com/api/v3/coins/litecoin?tickers=true';
const kraken = 'https://api.kraken.com/0/public/Ticker?pair=LTCUSD';
const binance = 'https://www.binance.com/api/v3/ticker/price?symbol=LTCUSDT';
const gemini = 'https://api.gemini.com/v1/pubticker/ltcusd';

// Array to store coin prices in order of coinbase, coingecko, kraken, binance, gemini
var ltcPrices = []

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

// FETCH COINGEKO PRICE
fetch(coinGecko)
    .then((resp) => resp.json())
    .then(function (coinData) {
        console.log(coinData.market_data.current_price.usd + " CoinGeko");
        ltcPrices[1] = coinData.market_data.current_price.usd;
    })
    .catch(function (error) {
        console.log(error);
    });

// FETCH KRAKEN PRICE
fetch(kraken)
    .then((resp) => resp.json())
    .then(function (coinData) {
        console.log(parseFloat(coinData.result.XLTCZUSD.b[0]) + " Kraken")
        ltcPrices[2] = parseFloat(coinData.result.XLTCZUSD.b[0]);
    })
    .catch(function (error) {
        console.log(error);
    });

// FETCH BINANCE PRICE
fetch(binance)
    .then((resp) => resp.json())
    .then(function (coinData) {
        console.log(parseFloat(coinData.price) + " Binance")
        ltcPrices[3] = parseFloat(coinData.price);
    })
    .catch(function (error) {
        console.log(error);
    });

// FETCH GEMINI PRICE
fetch(gemini)
    .then((resp) => resp.json())
    .then(function (coinData) {
        console.log(coinData.ask + " Gemini")
        ltcPrices[4] = parseFloat(coinData.ask);
    })
    .catch(function (error) {
        console.log(error);
    });

// Will wait for all api's to fetch the current price of LTC before continuing to print out the array
const timeoutSeconds = 5
var currentWait = 0.0;

var interval = setInterval(function () {
    if ((ltcPrices[0] && ltcPrices[1] && ltcPrices[2] && ltcPrices[3] && ltcPrices[4]) || currentWait >= 5) {
        console.log(ltcPrices)
        clearInterval(interval);
    } else {
        console.log('Retriving LTC Prices');
        currentWait += 0.5;
    }
}, 500);

