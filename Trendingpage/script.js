// https://api.coinbase.com/v2/prices/LTC-USD/sell
// https://api.coingecko.com/api/v3/coins/litecoin?tickers=true
// https://api.kraken.com/0/public/Ticker?pair=LTCUSD
// https://www.binance.com/api/v3/ticker/price?symbol=LTCUSDT
// https://api.gemini.com/v1/pubticker/ltcusd

const coinBase = "https://api.coinbase.com/v2/prices/LTC-USD/sell";
const coinGecko =
  "https://api.coingecko.com/api/v3/coins/litecoin?tickers=true";
const kraken = "https://api.kraken.com/0/public/Ticker?pair=LTCUSD";
const binance = "https://www.binance.com/api/v3/ticker/price?symbol=LTCUSDT";
const gemini = "https://api.gemini.com/v1/pubticker/ltcusd";
const trending = "https://api.coingecko.com/api/v3/search/trending";

// Array to store coin prices in order of coinbase, coingecko, kraken, binance, gemini
var ltcPrices = [];
var trendinglist = [];

//FETCH TRENDING LIST
fetch(trending)
  .then((resp) => resp.json())
  .then(function (coinData) {
    trendinglist = coinData.coins;
  })
  .catch(function (error) {
    console.log(error);
  });

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
    console.log(parseFloat(coinData.result.XLTCZUSD.b[0]) + " Kraken");
    ltcPrices[2] = parseFloat(coinData.result.XLTCZUSD.b[0]);
  })
  .catch(function (error) {
    console.log(error);
  });

// FETCH BINANCE PRICE
fetch(binance)
  .then((resp) => resp.json())
  .then(function (coinData) {
    console.log(parseFloat(coinData.price) + " Binance");
    ltcPrices[3] = parseFloat(coinData.price);
  })
  .catch(function (error) {
    console.log(error);
  });

// FETCH GEMINI PRICE
fetch(gemini)
  .then((resp) => resp.json())
  .then(function (coinData) {
    console.log(coinData.ask + " Gemini");
    ltcPrices[4] = parseFloat(coinData.ask);
  })
  .catch(function (error) {
    console.log(error);
  });



function myFunction() {
  // Loop through the sorted results array and append the HTML elements to the page

  for (let result of trendinglist) {
    let text =
      `<div class="col lg-4">
            <div class="card mb-3">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item white-bg">
                        <p>
                           <img class="img-btc" src=` +
      result.item.large +
      ` alt="coin"/>
                        </p>
                        <p>
                            <span class="black">` +
      result.item.name +
      `</span>
                        </p>
                        <span class="fs-6 text text-muted">$ ` +
      result.item.price_btc.toFixed(10) +
      `</span>
                    </li>

                </ul>
                <div class="card-body">
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      </p>
                    <button onclick="location.href='` +
      //   companyToLink(result.buyCompany) +
      `'"  type="button" class="btn btn-success me-5">Buy</button>
                    <button onclick="location.href='` +
      //   companyToLink(result.sellCompany) +
      `'" type="button" class="btn btn-danger">Sell</button>
                    </div>
                    <div class="card-footer text-muted">Last updated ` +
      //   moment().startOf("second").fromNow() +
      `</div>
                </div>
            </div>`;

    $("#trendingPage").append(text);
  }
  
}

var interval = setInterval(function () {
  if (
    (ltcPrices[0] &&
      ltcPrices[1] &&
      ltcPrices[2] &&
      ltcPrices[3] &&
      ltcPrices[4]) ||
    currentWait >= 5
  ) {
    console.log(ltcPrices);
    myFunction();
    clearInterval(interval);
  } else {
    console.log("Retriving LTC Prices");
    currentWait += 0.5;
  }
}, 500);