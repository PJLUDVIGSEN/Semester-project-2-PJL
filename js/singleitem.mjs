import { getPost } from "./api/listings/read.mjs";
import { bidListener } from "./handlers/createAuction.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const listingContainer = document.querySelector(".listingContainer");
const bets = document.querySelector(".betsContainer");
const bidBtn = document.querySelector(".btn-bid");
const errorMessage = document.querySelector(".alert");

// checking for logged in user to display error message and hide bet-information for non logged in users
if (localStorage.getItem("user") === null) {
  errorMessage.classList.remove("d-none");
  bets.classList.add("d-none");
}


// Api call to display dynamic listing content as HTML
async function listingsingle(container) {
  const listingData = await getPost(id);
  const endTime = new Date(listingData.endsAt);
  container.innerHTML = ` <div class="container px-4 px-lg-5 my-5">
                          <div class="row gx-4 gx-lg-5 align-items-center">
                            <div class="col-md-5"><img class="card-img-top mb-5 mb-md-0" onerror="this.src='/images/product-image-placeholder.png'"
                                src="${listingData.media}" alt="..." /></div>
                            <div class="col-md-6">
                              <div class="small mb-1">Seller: ${listingData.seller.name}</div>
                              <h1 class="display-5 fw-bolder">${listingData.title}</h1>
                              <div class="fs-5 mb-5">
                                <span>Auction End: ${endTime}</span>
                              </div>
                              <p class="lead desc">${listingData.description}</p>

                            </div>
                          </div>
                        </div>`;

    const productInfo = document.querySelector(".desc");
    if (listingData.description === null) {
      productInfo.innerHTML = `No description`;
    }
  for (let i = 0; i < listingData.bids.length; i++) {
    if (listingData.bids)
      bets.innerHTML += `<a class="bid list-group-item list-group-item-action">${listingData.bids[i].amount} credits by ${listingData.bids[i].bidderName}</a>`;
  }
}
listingsingle(listingContainer);

//listener for sending a bet on a listing
bidBtn.addEventListener("click", bidListener());
