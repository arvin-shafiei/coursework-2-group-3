
function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getYear() + 1900;
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year + ' ';
  return time;
}

const coinGeckobtc = 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=max';
const coinGeckoeth = 'https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=max';
const coinGeckoltc = 'https://api.coingecko.com/api/v3/coins/litecoin/ohlc?vs_currency=usd&days=max';

let chartData1, chartData2, chartData3 = []

fetch(coinGeckobtc).then((resp) => resp.json()).then(function (coinData1) {
  console.log(coinData1 + " CoinGekobtc");
  chartData1 = coinData1
}).
  catch(function (error) {
    console.log(error);
  });

var currentWait = 0.0;

var interval = setInterval(function () {
  if ((chartData1[0]) || currentWait >= 5) {

    for (let i = 0; i < chartData1.length; i++) {
      chartData1[i][0] = timeConverter(chartData1[i][0])
    }
    var data = google.visualization.arrayToDataTable(chartData1, true);

    var options = {
      legend: 'none'
    }

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_btc'));

    chart.draw(data, options);
    clearInterval(interval);
  } else {
    console.log('Retriving BTC Prices');
    currentWait += 0.5;
  }
},
  500);

fetch(coinGeckoeth).then((resp) => resp.json()).then(function (coinData2) {
  console.log(coinData2 + " CoinGekoeth");
  chartData2 = coinData2
}).
  catch(function (error) {
    console.log(error);
  });

var currentWait2 = 0.0;
var interval2 = setInterval(function () {

  if ((chartData2[0]) || currentWait2 >= 5) {
    for (let i = 0; i < chartData2.length; i++) {
      chartData2[i][0] = timeConverter(chartData2[i][0])
    }
    var data = google.visualization.arrayToDataTable(chartData2, true);

    var options = {
      legend: 'none'
    }

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_eth'));

    chart.draw(data, options);
    clearInterval(interval2);
  } else {
    console.log('Retriving ETH Prices');
    currentWait2 += 0.5;
  }

},
  500);

fetch(coinGeckoltc).then((resp) => resp.json()).then(function (coinData3) {
  console.log(coinData3 + " CoinGekoltc");
  chartData3 = coinData3
}).
  catch(function (error) {
    console.log(error);
  });

var currentWait3 = 0.0;
var interval3 = setInterval(function () {
  if ((chartData3[0]) || currentWait3 >= 5) {

    for (let i = 0; i < chartData3.length; i++) {
      chartData3[i][0] = timeConverter(chartData3[i][0])
    }
    var data = google.visualization.arrayToDataTable(chartData3, true);

    var options = {
      legend: 'none'
    }

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_ltc'));

    chart.draw(data, options);
    clearInterval(interval3);

  } else {
    console.log('Retriving LTC Prices');
    currentWait3 += 0.5;
  }
}, 500);

