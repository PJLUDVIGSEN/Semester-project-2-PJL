import { createFormListener } from "./handlers/createPost.mjs";
import { updateFormListener } from "./handlers/updatePost.mjs";
import { getPosts, getProfilePosts } from "./api/posts/read.mjs";
import { authFetch } from "../js/api/authFetch.mjs";
import { load } from "./handlers/storage.mjs";
import { API_HOST_URL, API_PROFILE } from "./api/constants.mjs";

const credits = document.querySelector(".credits")
const profileName = document.querySelector(".profileName");
const auctionFeed = document.querySelector(".auctionFeed");
const avatarBtn = document.querySelector(".bttn");
const avatarForm = document.querySelector(".avatar");
const avatarContainer = document.querySelector(".rounded-circle")
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
  avatarContainer.src = `${auctionProfile.avatar}`
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
                                      <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="singleitem.html">View</a></div>
                                    </div>
                                </div>`;
    }


  return auctionProfile;
}

getProfile();


export async function updateAvt(postData) {
  const updatePostURL = `${API_HOST_URL}${API_PROFILE}/${userName}/media`;
  const response = await authFetch(updatePostURL, {
    method:"put",
    body: JSON.stringify(postData),
  });

  const update = await response.json();
  console.log(update);
  return update;
}


export async function changeAvatar() {
  const form = document.querySelector(".avatar");
  const formData = new FormData(form);
  const post = Object.fromEntries(formData.entries());
  console.log(post);
  updateAvt(post);
}


avatarBtn.addEventListener("click", function updateAvatar() {
  console.log("hello");
  console.log(avatarForm.classList)
  if (avatarForm.classList.contains("d-none")) {
    avatarForm.classList.remove("d-none");
    avatarBtn.textContent = "submit"
  } else if (!avatarForm.classList.contains("d-none")) {
    changeAvatar();
    avatarForm.classList.add("d-none");
    avatarBtn.textContent = "Change Avatar";
  }
});