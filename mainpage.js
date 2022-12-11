const coinGecko = 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=max';

let dataTHing = []

fetch(coinGecko)
    .then((resp) => resp.json())
    .then(function (coinData) {
        console.log(coinData + " CoinGeko");
        dataTHing = coinData
    })
    .catch(function (error) {
        console.log(error);
    });

    function drawChart() {
        var data = google.visualization.arrayToDataTable(dataTHing, true);
     
        var options = {
          legend:'none'
        };
     
        var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
     
        chart.draw(data, options);
      }