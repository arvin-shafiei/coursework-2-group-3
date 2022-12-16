const trending = "https://api.coingecko.com/api/v3/search/trending";
var trendinglist = [];

fetch(trending)
  .then((resp) => resp.json())
  .then(function (coinData) {
    coinData.coins.map((data) => {
      getData(
        `https://api.coingecko.com/api/v3/coins/${data.item.id}?sparkline=true`
      );
    });
  })
  .catch(function (error) {
    console.log(error);
  });

function getData(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {

      trendinglist.push(data);

    })
    .catch(function (error) {
      console.log(error);
    });
}

function displayCards() {
  for (let result of trendinglist) {
    let text =
      `<div class="col lg-4">
          <div class="card mb-3">
            <ul class="list-group list-group-flush">
                <li class="list-group-item white-bg">
                  <div>
                    <p>
                       <img class="img-btc" src=` + result.image.large + ` alt="coin"/>
                    <   
                    <p>
                        <span class="black">` + result.name + ` (` + result.symbol + `) </span>
                    <   
                    <span class="fs-6 text text-muted">$ ` + result.market_data.current_price.usd + `</span>
                  <div>
                </li>
            </    
            <div class="card-body">
                <p class="desc">` + result.description.en + `</p>
            </d   
            <div>
              <canvas id=` + result.id + `></canvas>
            </div>
               
            <div class="buy-btn btn btn-success"> 
                <a href=` + result.links.homepage[0] + ` target="_blank" >Buy</a>
            </div>
          </div>
        </div>`;
    $("#trendingCrypto").append(text);
  }
}

function initializeCharts(id, dataset) {
  const ctx = document.getElementById(id);
  console.log(dataset)
  new Chart(ctx, {
    type: 'line',
    backgroundColor: '#9BD0F5',
    data: {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [{
        data: dataset.price,
        label: '',
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
      }]
    },
    options: {
      legend: { display: false },
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            color: "",
          }
        }],
        yAxes: [{
          gridLines: {
            color: "",
          }
        }]
      }
    }
  });
}
setTimeout(() => {
  displayCards();
}, 3000);

setTimeout(() => {
  trendinglist.map((data) => {
    initializeCharts(data.id, data.market_data.sparkline_7d);
  })
}, 4000);
