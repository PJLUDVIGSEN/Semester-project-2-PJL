import { API_HOST_URL } from "./api/constants.mjs";
import { API_LISTINGS } from "./api/constants.mjs";
import { authFetch } from "./api/authFetch.mjs";
import { searchListings } from "./api/listings/read.mjs";
const method = "get";

const auctionFeed = document.querySelector(".auctionFeed");

export async function displayListings(url) {
  const response = await authFetch(url, {
    method,
  });

  const result = await response.json();
  const listingData = result;

  for (let i = 0; i < listingData.length; i++) {
    if (auctionFeed)
      auctionFeed.innerHTML += `<div class="col mb-5">
                                  <div class="card h-100">
                                    <!-- Sale badge-->
                                    <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                                    <!-- Product image-->
                                    <img class="card-img-top" onerror="this.src='/images/product-image-placeholder.png'" src="${listingData[i].media[0]}" alt="..." />
                                    <!-- Product details-->
                                    <div class="card-body p-4">
                                      <div class="text-center">
                                        <!-- Product name-->
                                        <h5 class="fw-bolder">${listingData[i].title}</h5>
                                        <!-- Product reviews-->
                                        <div class="d-flex justify-content-center small text-warning mb-2">
                                          <div class="bi-star-fill"></div>
                                          <div class="bi-star-fill"></div>
                                          <div class="bi-star-fill"></div>
                                          <div class="bi-star-fill"></div>
                                          <div class="bi-star-fill"></div>
                                        </div>
                                      </div>
                                    </div>
                                    <!-- Product actions-->
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                      <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="singleitem.html?id=${listingData[i].id}">View</a></div>
                                    </div>
                                </div>`;
  }
}

displayListings(
  API_HOST_URL +
    API_LISTINGS +
    "?_seller=true&_bids=true&_active=true&sort=created&sortOrder=desc"
);

export function renderListings(searchListings) {
  auctionFeed.innerHTML = "";

  searchListings.forEach(function (listingData) {
    auctionFeed.innerHTML += `<div class="col mb-5">
                                  <div class="card h-100">
                                    <!-- Sale badge-->
                                    <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                                    <!-- Product image-->
                                    <img class="card-img-top" onerror="this.src='/images/product-image-placeholder.png'" src="${listingData.media[0]}" alt="..." />
                                    <!-- Product details-->
                                    <div class="card-body p-4">
                                      <div class="text-center">
                                        <!-- Product name-->
                                        <h5 class="fw-bolder">${listingData.title}</h5>
                                        <!-- Product reviews-->
                                        <div class="d-flex justify-content-center small text-warning mb-2">
                                          <div class="bi-star-fill"></div>
                                          <div class="bi-star-fill"></div>
                                          <div class="bi-star-fill"></div>
                                          <div class="bi-star-fill"></div>
                                          <div class="bi-star-fill"></div>
                                        </div>
                                      </div>
                                    </div>
                                    <!-- Product actions-->
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                      <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="singleitem.html?id=${listingData.id}">View</a></div>
                                    </div>
                                </div>`;
  });
}

async function goSearch() {
  const url =
    API_HOST_URL +
    API_LISTINGS +
    "?_seller=true&_bids=true&_active=true&sort=created&sortOrder=desc";
  const result = await authFetch(url);
  const response = await result.json();
  searchListings(response);
}

const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
  document.getElementById("searchBtn").addEventListener("click", goSearch());
}
