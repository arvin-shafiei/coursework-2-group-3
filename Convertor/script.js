const btcApi = 'https://api.coinbase.com/v2/prices/BTC-USD/sell';
const ethApi = 'https://api.coinbase.com/v2/prices/ETH-USD/sell';
const ltcApi = 'https://api.coinbase.com/v2/prices/LTC-USD/sell';

var btcPrice;
var ethPrice;
var ltcPrice;

// FETCH COINBASE PRICE
fetch(btcApi)
    .then((resp) => resp.json())
    .then(function (coinData) {
        btcPrice = parseFloat(coinData.data.amount);
    })
    .catch(function (error) {
        console.log(error);
    });

fetch(ethApi)
    .then((resp) => resp.json())
    .then(function (coinData) {
        ethPrice = parseFloat(coinData.data.amount);
    })
    .catch(function (error) {
        console.log(error);
    });

fetch(ltcApi)
    .then((resp) => resp.json())
    .then(function (coinData) {
        ltcPrice = parseFloat(coinData.data.amount);
    })
    .catch(function (error) {
        console.log(error);
    });

function ConvertCrypto() {
    let convertedAmount = 0.00;
    let inputtedAmount = $("#crypto-amount").val();
    let selectedCoin = $("#crypto-select").val();

    if (selectedCoin) {
        switch (selectedCoin) {
            case "Bitcoin":
                convertedAmount = parseFloat(inputtedAmount) * parseFloat(btcPrice);
                break;
            case "Ethereum":
                convertedAmount = parseFloat(inputtedAmount) * parseFloat(ethPrice);
                break;
            case "Litecoin":
                convertedAmount = parseFloat(inputtedAmount) * parseFloat(ltcPrice);
                break;
        }

        $("#ConvertAmount").text(convertedAmount);
    }
}
