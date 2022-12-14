const coinBase = 'https://api.coingecko.com/api/v3/nfts/list?per_page=15&page=1';
const nftDetailsBase = 'https://api.coingecko.com/api/v3/nfts/';

let nftList = []
const timeoutSeconds = 5
var currentWait = 0.0;
let nftwData = [];

// FETCH COINBASE PRICE
fetch(coinBase)
    .then((resp) => resp.json())
    .then(function (coinData) {
        console.log(coinData);
        nftList = coinData;
    })
    .catch(function (error) {
        console.log(error);
    });

function myFunction() {
    console.log(nftList.length);
    for (let i = 0; i < nftList.length; i++) {
        console.log("monkey")

        if (nftList[i].id != '') {
            console.log(nftList[i].id)
            fetch(nftDetailsBase + nftList[i].id)
                .then((resp) => resp.json())
                .then(function (nftDatq) {
                    console.log("Pushed")
                    nftwData.push({
                        name: nftDatq.name,
                        asset_platform_id: nftDatq.asset_platform_id,
                        image: nftDatq.image.small,
                        floor_price: nftDatq.floor_price.usd + "(" + nftDatq.floor_price.native_currency + ")",
                        total_supply: nftDatq.total_supply
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });

            var myInterval = setInterval(function () {
                if (nftwData[15]) {
                    clearInterval(myInterval);
                    console.log("hi")
                    console.log(nftwData.length)
                    for (let result of nftwData) {
                        console.log("here??")
                        const textExample = `<div class='col-lg-6'>
        <div class="card"
            style="width:100%;height:210px;min-height:200px;max-width:670px;box-shadow:0px 1px 6px rgba(0, 0, 0, 0.25);border-radius:5px;">
            <div>
                <info-button style="position:absolute;top:5px;right:5px"></info-button>
                <table>
                    <tr>
                        <td style='width:39%;'>
                            <a target="_blank"
                                href="https://solanart.io/search/?token=Fg57RznsXDC8EhbwadQP1cSk18ZcDGYVGigRQdqFhJkq">
                                <img src="` + result.image + `"
                                    style='max-width:100%;height:206px;' alt='nft' />
                            </a>
                        </td>
                        <td>
                            <div class="text-left ml-3">
                                <span class="badge badge-pill badge-light p-2 border">` + result.name + `</span>
                            </div>
                            <div class="excc" style="padding:20px;margin-bottom:20px;">
                                <span class="float-left">` + result.name + `</span>
                                <span class="float-right">
                                    <img src="/inc/coin_logos_small/solana.png" alt='solana' />
                                    9.3
                                </span>
                            </div>
                            <a target="_blank"
                                href="https://solanart.io/search/?token=Fg57RznsXDC8EhbwadQP1cSk18ZcDGYVGigRQdqFhJkq"
                                class="text-decoration-none btn btn-primary"
                                style="width:90%;font-size:88%;-webkit-appearance:none;">
                                <b>BUY THIS ITEM</b>
                                <i class="fa fa-chevron-right"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>`
                        $("#sus").append(textExample);
                    }
                    //console.log(nftwData[i].total_supply);
                }

            }, 1000);




        }
    }
}

var interval = setInterval(function () {
    if (nftList[0] || currentWait >= 5) {
        // hi
        myFunction();
        clearInterval(interval);
    }
    else {
        console.log('Retriving LTC Prices');
        currentWait += 0.5;
    }
}, 500);

