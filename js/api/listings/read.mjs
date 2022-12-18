// import {
//   API_PROFILE,
//   API_SOCIAL_listings,
//   API_SOCIAL_URL,
//   API_SOCIAL_URL_listings,
//   fullDetails,
//   postDetails,
//   postLength,
// } from "../constants.mjs";
import { API_HOST_URL, API_LISTINGS, moreInfo } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { renderListings } from "../../auction.mjs";
// import { renderlistings } from "../../postfeed.mjs";
const action = "/listings";
const method = "get";

/**
 * Get request to fetch all listings from the API
 * @param  {string} getPostURL
 * @param  {string} method
 */
export async function getListings() {
  const getPostURL = `${API_SOCIAL_URL_listings}`;
  const response = await authFetch(getPostURL, {
    method,
  });

  const alllistings = await response.json();
  return alllistings;
}

/**
 * Getrequest to fetch listings with a specific parameter, in this case length of result.
 * @param  {string} constgetPostURL
 * @param  {string} method
 */
export async function getProfileListings() {
  const getPostURL = `${API_SOCIAL_URL_listings}${postLength}`;
  const response = await authFetch(getPostURL, {
    method,
  });

  const profilelistings = await response.json();
  return profilelistings;
}

/**
 * Get request to api to fetch listings with a specific id parameter
 * @param  {number} id
 * @param  {string} constgetPostURL
 * @param  {string} method
 * @param  {Array} singlePost
 */
export async function getPost(id) {
  const getPostURL = `${API_HOST_URL}${API_LISTINGS}/${id}${moreInfo}`;

  const response = await authFetch(getPostURL, {
    method,
  });

  const singlePost = await response.json();

  return singlePost;
}

/**
 * Function to render specific results based on if the inputvalue inherit the values of a post from the api
 * @param  {array} listings this is the api result
 * @param  {value} searchValue this is the value input by the user
 * @param  {newArray} filteredlistings this is the filtered listings
 * @param  {function} renderlistings this is the function to render the filteredlistings
 * @param  {string} post.title property we are filtering by
 * @param  {string} post.body property we are filtering by
 * @param  {number} post.id property we are filtering by
 * @param  {string} post.author.name property we are filtering by
 * @returns {object} returns a filtered list of listings determined by the value input by the user
 */
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

// ||
//         post.description.toLowerCase().startsWith(searchValue) ||
//         post.id.toString().startsWith(searchValue)
