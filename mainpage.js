
      function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getYear() + 1900;
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ';
        return time;
      }
      
      
      const coinGeckobtc = 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=max';
      
      let dataTHing1 = []
      
      fetch(coinGeckobtc).then((resp) => resp.json()).then(function(coinData1) {
        console.log(coinData1 + " CoinGekobtc");
        dataTHing1 = coinData1
      }).
      catch(function(error) {
        console.log(error);
      });
      
      const timeoutSeconds1 = 5
      
      var currentWait = 0.0;
      
      var interval = setInterval(function() {
      
        if ((dataTHing1[0]) || currentWait >= 5) {
      
          for (let i = 0; i < dataTHing1.length; i++) {
            dataTHing1[i][0] = timeConverter(dataTHing1[i][0])
          }
            var data = google.visualization.arrayToDataTable(dataTHing1, true);
      
            var options = {
              legend: 'none'
            }
      
            var chart = new google.visualization.CandlestickChart(document.getElementById('chart_btc'));
      
            chart.draw(data, options);
      
          clearInterval(interval);
      
        } else {
      
          console.log('Retriving btc Prices');
      
          currentWait += 0.5;
      
        }
      
      },
      500);
      
      function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getYear() + 1900;
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ';
        return time;
      }
      
      
      const coinGeckoeth = 'https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=max';
      
      let dataTHing2 = []
      
      fetch(coinGeckoeth).then((resp) => resp.json()).then(function(coinData2) {
        console.log(coinData2 + " CoinGekoeth");
        dataTHing2 = coinData2
      }).
      catch(function(error) {
        console.log(error);
      });
      
      const timeoutSeconds2 = 5
      
      var currentWait2 = 0.0;
      
      var interval2 = setInterval(function() {
      
        if ((dataTHing2[0]) || currentWait2 >= 5) {
      
          for (let i = 0; i < dataTHing2.length; i++) {
            dataTHing2[i][0] = timeConverter(dataTHing2[i][0])
          }
            var data = google.visualization.arrayToDataTable(dataTHing2, true);
      
            var options = {
              legend: 'none'
            }
      
            var chart = new google.visualization.CandlestickChart(document.getElementById('chart_eth'));
      
            chart.draw(data, options);
      
          clearInterval(interval2);
      
        } else {
      
          console.log('Retriving eth Prices');
      
          currentWait2 += 0.5;
      
        }
      
      },
      500);
      
      function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getYear() + 1900;
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ';
        return time;
      }
      
      const coinGeckoltc = 'https://api.coingecko.com/api/v3/coins/litecoin/ohlc?vs_currency=usd&days=max';
      
      let dataTHing3 = []
      
      fetch(coinGeckoltc).then((resp) => resp.json()).then(function(coinData3) {
        console.log(coinData3 + " CoinGekoltc");
        dataTHing3 = coinData3
      }).
      catch(function(error) {
        console.log(error);
      });
      
      const timeoutSeconds3 = 5
      
      var currentWait3 = 0.0;
      
      var interval3 = setInterval(function() {
      
        if ((dataTHing3[0]) || currentWait3 >= 5) {
      
          for (let i = 0; i < dataTHing3.length; i++) {
            dataTHing3[i][0] = timeConverter(dataTHing3[i][0])
          }
            var data = google.visualization.arrayToDataTable(dataTHing3, true);
      
            var options = {
              legend: 'none'
            }
      
            var chart = new google.visualization.CandlestickChart(document.getElementById('chart_ltc'));
      
            chart.draw(data, options);
      
          clearInterval(interval3);
      
        } else {
      
          console.log('Retriving ltc Prices');
      
          currentWait3 += 0.5;
      
        }
      
      },
      500);
      
      