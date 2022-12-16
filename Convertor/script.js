// Initialise Variables
const btcApi = 'https://api.coinbase.com/v2/prices/BTC-USD/sell';
const ethApi = 'https://api.coinbase.com/v2/prices/ETH-USD/sell';
const ltcApi = 'https://api.coinbase.com/v2/prices/LTC-USD/sell';

var btcPrice;
var ethPrice;
var ltcPrice;

// Fetch coin prices from coinbase
fetch(btcApi)
    .then((resp) => resp.json())
    .then(function (coinData) {
        // Set the BTC price to the amount from the API response
        btcPrice = parseFloat(coinData.data.amount);
    })
    .catch(function (error) {
        console.log(error);
    });

fetch(ethApi)
    .then((resp) => resp.json())
    .then(function (coinData) {
        // Set the ETH price to the amount from the API response
        ethPrice = parseFloat(coinData.data.amount);
    })
    .catch(function (error) {
        console.log(error);
    });

fetch(ltcApi)
    .then((resp) => resp.json())
    .then(function (coinData) {
        // Set the LTC price to the amount from the API response
        ltcPrice = parseFloat(coinData.data.amount);
    })
    .catch(function (error) {
        console.log(error);
    });

function ConvertCrypto() {
    // Initialize the converted amount to 0
    let convertedAmount = 0.00;
    // Get the inputted amount from the form
    let inputtedAmount = $("#crypto-amount").val();
    // Get the selected coin from the form
    let selectedCoin = $("#crypto-select").val();

    // If a coin is selected
    if (selectedCoin) {
        // Convert the amount to the selected coin
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

        // Set the converted amount text to the calculated value
        $("#ConvertAmount").text(convertedAmount);
    }
}
