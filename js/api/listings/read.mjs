import { API_HOST_URL, API_LISTINGS, moreInfo } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { renderListings } from "../../auction.mjs";

const action = "/listings";
const method = "get";



// Get request to api to fetch listings with a specific id parameter

export async function getPost(id) {
  const getPostURL = `${API_HOST_URL}${API_LISTINGS}/${id}${moreInfo}`;

  const response = await authFetch(getPostURL, {
    method,
  });

  const singlePost = await response.json();

  return singlePost;
}

export function searchListings(listings) {
  const searchInput = document.getElementById("searchInput");
  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchValue = searchInput.value.trim().toLowerCase();
    const filteredlistings = listings.filter(function (post) {
      if (
        post.seller.name.toLowerCase().startsWith(searchValue) ||
        post.title.toLowerCase().startsWith(searchValue)
      ) {
        return true;
      }
    });
    renderListings(filteredlistings);
  });
}
