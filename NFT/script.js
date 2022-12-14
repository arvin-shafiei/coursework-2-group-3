const nftBase = 'https://api.coingecko.com/api/v3/nfts/list?per_page=15&page=1';
const nftDetailsBase = 'https://api.coingecko.com/api/v3/nfts/';
const timeoutSeconds = 5
var currentWait = 0.0;


let nftList, nftwData = []

function truncateString(string, limit) {
    if (string.length > limit) {
      return string.substring(0, limit) + "..."
    } else {
      return string
    }
  }

fetch(nftBase)
  .then((resp) => resp.json())
  .then(function (nftData) {
    console.log(nftData);
    nftList = nftData;
    RequestNFTDetails();
  })
  .catch(function (error) {
    console.log(error);
  });

function RequestNFTDetails() {
  for (let i = 0; i < nftList.length; i++) {
    if (nftList[i].id != '') {
      fetch(nftDetailsBase + nftList[i].id)
        .then((resp) => resp.json())
        .then(function (nftDatq) {
            nftwData.push({
                name: nftDatq.name,
                description: truncateString(nftDatq.description, 180),
                contract_address: nftDatq.contract_address,
                asset_platform_id: nftDatq.asset_platform_id,
                image: nftDatq.image.small,
                native_currency: nftDatq.native_currency,
                floor_price: "$" + nftDatq.floor_price.usd + " (" + nftDatq.floor_price.native_currency + " " + nftDatq.native_currency + ") ",
                total_supply: nftDatq.total_supply
              });
              if (i == 14) {
                displayCards();
              }
        })
        .catch(function (error) {
          console.log(error);
        });   
    }
}}

 function displayCards() {
  for (let result of nftwData) {
    const cardText = `<div class='col-lg-6 p-1'>
        <div class="card shadow-sm">
            <div>
                <info-button></info-button>
                <table>
                    <tr>
                        <td>
                            <a target="_blank" href="https://opensea.io/assets?search[query]=` + result.contract_address +`">
                                <img src="` + result.image + `"
                                class="rounded card_image_size" alt='nft' />
                            </a>
                        </td>
                        <td class="px-3">
                            <div>
                                <span class="float-left"><b>` + result.name + `</b></span>
                                <span class="float-right">
                                    ` +  result.floor_price +`
                                    
                                </span>
                            </div>

                            <br>

                            <div>
                            <p> ` + result.description +` </p>
                            </div>
                            <a target="_blank"
                                href="https://opensea.io/assets?search[query]=` + result.contract_address +`"
                                class="text-decoration-none btn btn-primary">
                                <b>BUY THIS ITEM</b>
                                <i class="fa fa-chevron-right"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>`
    $("#nftcards").append(cardText);
  }
}
