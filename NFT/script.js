const nftBase = 'https://api.coingecko.com/api/v3/nfts/list?per_page=16&page=2'; // URL for CoinGecko API to retrieve list of NFTs
const nftDetailsBase = 'https://api.coingecko.com/api/v3/nfts/'; // URL for CoinGecko API to retrieve details for individual NFTs

let nftList, nftwData = [] // Arrays to store retrieved NFT data

// Function to truncate the description of an NFT to a specified number of characters
function truncateString(string, limit) {
    if (string.length > limit) {
        return string.substring(0, limit) + "..."
    } else {
        return string
    }
}

// Send a request to CoinGecko API to retrieve list of NFTs
fetch(nftBase)
    .then((resp) => resp.json()) // Parse response as JSON
    .then(function (nftData) {
        nftList = nftData; // Store the data in the nftList array
        RequestNFTDetails(); // Call function to retrieve details for individual NFTs
    })
    .catch(function (error) {
        console.log("Rate Limit Reached, slow down!");
        console.log(error); // Log any errors to the console
    });

// Function to retrieve details for each NFT in the nftList array
function RequestNFTDetails() {
    for (let i = 0; i < nftList.length; i++) { // Iterate over the NFTs in the nftList array
        fetch(nftDetailsBase + nftList[i].id)
            .then((resp) => resp.json()) // Parse the response as JSON
            .then(function (nftDatq) {
                // Add the details for the current NFT to the nftwData array
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
                if (i == 15) { // If all the details have been retrieved, call the displayCards function
                    displayCards();
                }
            })
            .catch(function (error) {
                console.log("Rate Limit Reached, slow down!");
                console.log(error); // Log any errors to the console
            });
    }
}

// Function to display the NFT data in a series of cards on a web page
function displayCards() {
    for (let result of nftwData) { // Iterate over the items in the nftwData array
        // Create the HTML for a card to display the current NFT's data
        const cardText = `<div class='col-lg-6 p-1'>
          <div class="card shadow-sm">
              <div>
                  <info-button></info-button>
                  <table>
                      <tr>
                          <td>
                              <a target="_blank" href="https://opensea.io/assets?search[query]=` + result.contract_address + `">
                                  <img src="` + result.image + `"
                                  class="rounded card_image_size" alt='nft'/>
                              </a>
                          </td>
                          <td class="px-3">
                              <div>
                                  <span class="float-left"><b>` + result.name + `</b></span>
                                  <span class="float-right">
                                      ` + result.floor_price + `
                                      
                                  </span>
                              </div>
  
                              <br>
  
                              <div>
                              <p> ` + result.description + ` </p>
                              </div>
                              <a target="_blank"
                                  href="https://opensea.io/assets?search[query]=` + result.contract_address + `"
                                  class="text-decoration-none btn btn-primary">
                                  <b>View Collection</b>
                                  <i class="fa fa-chevron-right"></i>
                              </a>
                          </td>
                      </tr>
                  </table>
              </div>
          </div>
      </div>`
        // Add the card to the web page   
        $("#nftcards").append(cardText);
    }
}

