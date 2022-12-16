const trending = "https://api.coingecko.com/api/v3/search/trending";
var trendinglist = [];

//FETCH TRENDING LIST
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

// FETCH COINBASE PRICE
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
function DisplayCards() {

  for (let result of trendinglist) {
    let text =
      `<div class="col lg-4">
            <div class="card mb-3">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item white-bg">

                    <div>
                        <p>
                           <img class="img-btc" src=` +
      result.image.large +
      ` alt="coin"/>
                        </p>
                        <p>
                            <span class="black">` +
      result.name + ` (` + result.symbol +
      `)</span>
                        </p>
                        <span class="fs-6 text text-muted">$ ` +
      result.market_data.current_price.usd +
      `</span>
       <div>
                    </li>

                </ul>
                <div class="card-body">
                    <p class="desc">
                    ` +
      result.description.en +
      `
      </p>
   
            
                    </div>
                    <div>
                    <canvas id=`+ result.id + `></canvas>
                    </div>
                   
                    <div class="buy-btn btn btn-success"> 
                    <a href=` +
      result.links.homepage[0] +
      ` target="_blank" >Buy</a>
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

        // borderWidth: 1
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
  DisplayCards();

}, 3000);

setTimeout(() => {
  trendinglist.map((data) => {
    console.log(data.market_data.sparkline_7d);
    initializeCharts(data.id, data.market_data.sparkline_7d);

  })
}, 4000);
