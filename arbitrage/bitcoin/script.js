const coinBase = 'https://api.coinbase.com/v2/prices/BTC-USD/sell';
const coinGecko = 'https://api.coingecko.com/api/v3/coins/bitcoin?tickers=true';
const kraken = 'https://api.kraken.com/0/public/Ticker?pair=BTCUSD';
const binance = 'https://www.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
const gemini = 'https://api.gemini.com/v1/pubticker/btcusd';

// Array to store coin prices in order of coinbase, coingecko, kraken, binance, gemini
var btcPrices = [];

// FETCH COINBASE PRICE
fetch(coinBase)
    .then((resp) => resp.json())
    .then(function (coinData) {
        console.log(coinData.data.amount + " Coinbase");
        btcPrices[0] = parseFloat(coinData.data.amount);
    })
    .catch(function (error) {
        console.log(error);
    });

// FETCH COINGEKO PRICE
fetch(coinGecko)
    .then((resp) => resp.json())
    .then(function (coinData) {
        console.log(coinData.market_data.current_price.usd + " CoinGeko");
        btcPrices[1] = coinData.market_data.current_price.usd;
    })
    .catch(function (error) {
        console.log(error);
    });

// FETCH KRAKEN PRICE
fetch(kraken)
    .then((resp) => resp.json())
    .then(function (coinData) {
        console.log(parseFloat(coinData.result.XXBTZUSD.b[0]) + " Kraken");
        btcPrices[2] = parseFloat(coinData.result.XXBTZUSD.b[0]);
    })
    .catch(function (error) {
        console.log(error);
    });

// FETCH BINANCE PRICE
fetch(binance)
    .then((resp) => resp.json())
    .then(function (coinData) {
        console.log(parseFloat(coinData.price) + " Binance")
        btcPrices[3] = parseFloat(coinData.price);
    })
    .catch(function (error) {
        console.log(error);
    });

// FETCH GEMINI PRICE
fetch(gemini)
    .then((resp) => resp.json())
    .then(function (coinData) {
        console.log(coinData.ask + " Gemini");
        btcPrices[4] = parseFloat(coinData.ask);
    })
    .catch(function (error) {
        console.log(error);
    });

// Will wait for all api's to fetch the current price of LTC before continuing to print out the array
const timeoutSeconds = 5
var currentWait = 0.0;

function determineCompanyName(index) {
    let companyName = 'Undefined';
    switch (index) {
        case 0:
            companyName = 'Coinbase';
            return companyName;
        case 1:
            companyName = 'Coingecko';
            return companyName;
        case 2:
            companyName = 'Kraken';
            return companyName;
        case 3:
            companyName = 'Binance';
            return companyName;
        case 4:
            companyName = 'Gemini';
            return companyName;
        default:
            return companyName;
    }
}

function companyToLink(companyName) {
    let companyLink = 'https://example.com';
    switch (companyName) {
        case 'Coinbase':
            companyLink = 'https://www.coinbase.com';
            return companyLink;
        case 'Coingecko':
            companyLink = 'https://www.coingecko.com';
            return companyLink;
        case 'Kraken':
            companyLink = 'https://www.kraken.com';
            return companyLink;
        case 'Binance':
            companyLink = 'https://www.binance.com/en';
            return companyLink;
        case 'Gemini':
            companyLink = 'https://www.gemini.com/uk';
            return companyLink;
        default:
            return companyLink;
    }
}


function myFunction() {
    // Create an empty array to store the results
    let results = [];

    // Loop through the btcPrices array
    for (let i = 0; i < btcPrices.length; i++) {
        for (let j = 0; j < btcPrices.length; j++) {
            if (!(i == j)) {
                if (btcPrices[i] < btcPrices[j]) {
                    // Calculate the percentage difference between the two prices
                    let diff = (((btcPrices[j] - btcPrices[i]) / btcPrices[i])) * 100;

                    // Store the result in the results array
                    results.push({
                        buyCompany: determineCompanyName(i),
                        sellCompany: determineCompanyName(j),
                        buyPrice: btcPrices[i].toFixed(2),
                        sellPrice: btcPrices[j].toFixed(2),
                        difference: diff.toFixed(2)
                    });
                }
            }
        }
    }

    // Sort the results array in descending order of the percentage difference
    results.sort((a, b) => b.difference - a.difference);

    // Loop through the sorted results array and append the HTML elements to the page
    for (let result of results) {
        let text = `<div class="col lg-4">
            <div class="card mb-3">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <p>
                            <span class="text-success fw-bold">Buy</span>
                        </p>
                        <p>
                            <span>` + result.buyCompany + `</span>
                        </p>
                        <span class="fs-6 text text-muted">USD Market @ ` + result.buyPrice + `</span>
                    </li>
                    <li class="list-group-item">
                        <p>
                            <span class="text-danger fw-bold">Sell</span>
                        </p>
                        <p>
                            <span>` + result.sellCompany + `</span>
                        </p>
                        <span class="fs-6 text text-muted">USD Market @ `+ result.sellPrice + `</span>
                    </li>
                </ul>
                <div class="card-body">
                    <p>` + result.difference + `%</p>
                    <button onclick="location.href='`+ companyToLink(result.buyCompany) + `'"  type="button" class="btn btn-success me-5">Buy</button>
                    <button onclick="location.href='`+ companyToLink(result.sellCompany) + `'" type="button" class="btn btn-danger">Sell</button>
                    </div>
                    <div class="card-footer text-muted">Updated @ ` + moment().format('MMMM Do YYYY, h:mm:ss a'); + `</div>
                </div>
            </div>`;


        $("#coinArbritage").append(text);
    }
}

var interval = setInterval(function () {
    if ((btcPrices[0] && btcPrices[1] && btcPrices[2] && btcPrices[3] && btcPrices[4]) || currentWait >= 5) {
        console.log(btcPrices);
        myFunction();
        clearInterval(interval);
    } else {
        console.log('Retriving BTC Prices');
        currentWait += 0.5;
    }
}, 500);