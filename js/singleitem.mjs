import { getPost } from "./api/posts/read.mjs";
import { bidListener } from "./handlers/createPost.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const listingContainer = document.querySelector(".listingContainer")
const bidBtn = document.querySelector(".btn-bid");

async function postSingle(container) {
  const postData = await getPost(id);
  const bets = document.querySelector(".betsContainer")
  console.log(postData)
container.innerHTML = ` <div class="container px-4 px-lg-5 my-5">
                          <div class="row gx-4 gx-lg-5 align-items-center">
                            <div class="col-md-5"><img class="card-img-top mb-5 mb-md-0"
                                src="${postData.media}" alt="..." /></div>
                            <div class="col-md-6">
                              <div class="small mb-1">Seller: ${postData.seller.name}</div>
                              <h1 class="display-5 fw-bolder">${postData.title}</h1>
                              <div class="fs-5 mb-5">
                                <span class="text-decoration-line-through">$45.00</span>
                                <span>$40.00</span>
                              </div>
                              <p class="lead">${postData.description}</p>

                            </div>
                          </div>
                        </div>`;
  
  for (let i = 0; i < postData.bids.length; i++) {
    if(postData.bids)
          bets.innerHTML += `<p class="bid">${postData.bids[i].amount} credits by ${postData.bids[i].bidderName}</p>`;
  }
}
postSingle(listingContainer);

bidBtn.addEventListener("click", bidListener());