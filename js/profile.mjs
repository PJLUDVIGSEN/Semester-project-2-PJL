import { createFormListener } from "./handlers/createAuction.mjs";
import { updateFormListener } from "./handlers/updateListing.mjs";
import { getListings, getProfileListings } from "./api/listings/read.mjs";
import { authFetch } from "../js/api/authFetch.mjs";
import { load } from "./handlers/storage.mjs";
import { API_HOST_URL, API_PROFILE } from "./api/constants.mjs";
// import { logout } from "./api/auth/logout.mjs";

const credits = document.querySelector(".credits");
const profileName = document.querySelector(".profileName");
const auctionFeed = document.querySelector(".auctionProfile");
const changeBtn = document.querySelector(".changeBtn");
const avatarBtn = document.querySelector(".bttn");
const avatarForm = document.querySelector(".avatar");
const avatarInput = document.querySelector(".avatarInput");
const avatarContainer = document.querySelector(".rounded-xl");
const logoutButton = document.querySelector(".logout");
const contentBoxes = document.querySelectorAll(".listings");
const errorMessage = document.querySelector(".alert")
const method = "get";

const userName = load("user").name;




export async function getProfile() {
  const getPostURL = `${API_HOST_URL}${API_PROFILE}/${userName}?_listings=true`;
  const response = await authFetch(getPostURL, {
    method,
  });

  const auctionProfile = await response.json();
  console.log(auctionProfile);
  console.log(userName);

  credits.innerHTML += `${auctionProfile.credits}`;
  profileName.innerHTML += `${auctionProfile.name}`;
  avatarContainer.src = `${auctionProfile.avatar}`;
  for (let i = 0; i < auctionProfile.listings.length; i++) {
    if (auctionFeed)
      auctionFeed.innerHTML += `<div class="col mb-5">
                                  <div class="card h-100">
                                    <!-- Sale badge-->
                                    <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                                    <!-- Product image-->
                                    <img class="card-img-top" src="${auctionProfile.listings[i].media[0]}" alt="..." />
                                    <!-- Product details-->
                                    <div class="card-body p-4">
                                      <div class="text-center">
                                        <!-- Product name-->
                                        <h5 class="fw-bolder">${auctionProfile.listings[i].title}</h5>
                                        <!-- Product reviews-->
                                        <div class="d-flex justify-content-center small text-warning mb-2">
                                          <div class="bi-star-fill"></div>
                                          <div class="bi-star-fill"></div>
                                          <div class="bi-star-fill"></div>
                                          <div class="bi-star-fill"></div>
                                          <div class="bi-star-fill"></div>
                                        </div>
                                        <!-- Product price-->
                                        <span class="text-muted text-decoration-line-through">$20.00</span>
                                        $18.00
                                      </div>
                                    </div>
                                    <!-- Product actions-->
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                      <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="singleitem.html?id=${auctionProfile.listings[i].id}">View</a></div>
                                    </div>
                                </div>`;
  }

  return auctionProfile;
}

getProfile();

export async function updateAvt(listingData) {
  const updateListingURL = `${API_HOST_URL}${API_PROFILE}/${userName}/media`;
  const response = await authFetch(updateListingURL, {
    method: "put",
    body: JSON.stringify(listingData),
  });

  const update = await response.json();
  console.log(update);
  return update;
}

export async function changeAvatar() {
  const form = document.querySelector(".avatar");
  const formData = new FormData(form);
  const listingformData = Object.fromEntries(formData.entries());
  console.log(listingformData);
  updateAvt(listingformData);
}

changeBtn.addEventListener("click", function updateAvatar() {
  console.log("hello");
  console.log(avatarInput.classList);
  if (avatarInput.classList.contains("d-none")) {
    avatarInput.classList.remove("d-none");
    avatarBtn.classList.remove("d-none");
    changeBtn.classList.add("d-none");
  }
});

avatarBtn.addEventListener("click", function updateAvatar() {
  changeAvatar();
  avatarInput.classList.add("d-none");
  avatarBtn.classList.add("d-none");
  changeBtn.classList.remove("d-none");
});

logoutButton.addEventListener("click", function logout() {
  console.log("hello");
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  location.href = "/index.html";
});
