// import {
//   API_PROFILE,
//   API_SOCIAL_POSTS,
//   API_SOCIAL_URL,
//   API_SOCIAL_URL_POSTS,
//   fullDetails,
//   postDetails,
//   postLength,
// } from "../constants.mjs";
import { API_HOST_URL, API_LISTINGS, moreInfo } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
// import { renderPosts } from "../../postfeed.mjs";
const action = "/posts";
const method = "get";

/**
 * Get request to fetch all posts from the API
 * @param  {string} getPostURL
 * @param  {string} method
 */
export async function getPosts() {
  const getPostURL = `${API_SOCIAL_URL_POSTS}`;
  const response = await authFetch(getPostURL, {
    method,
  });

  const allPosts = await response.json();
  return allPosts;
}

/**
 * Getrequest to fetch posts with a specific parameter, in this case length of result.
 * @param  {string} constgetPostURL
 * @param  {string} method
 */
export async function getProfilePosts() {
  const getPostURL = `${API_SOCIAL_URL_POSTS}${postLength}`;
  const response = await authFetch(getPostURL, {
    method,
  });

  const profilePosts = await response.json();
  return profilePosts;
}

/**
 * Get request to api to fetch posts with a specific id parameter
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
 * @param  {array} posts this is the api result
 * @param  {value} searchValue this is the value input by the user
 * @param  {newArray} filteredPosts this is the filtered posts
 * @param  {function} renderPosts this is the function to render the filteredposts
 * @param  {string} post.title property we are filtering by
 * @param  {string} post.body property we are filtering by
 * @param  {number} post.id property we are filtering by
 * @param  {string} post.author.name property we are filtering by
 * @returns {object} returns a filtered list of posts determined by the value input by the user
 */
export function searchPosts(posts) {
  const searchInput = document.getElementById("searchInput");
  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchValue = searchInput.value.trim().toLowerCase();
    const filteredPosts = posts.filter(function (post) {
      if (
        post.author.name.toLowerCase().startsWith(searchValue) ||
        post.title.toLowerCase().startsWith(searchValue) ||
        post.body.toLowerCase().startsWith(searchValue) ||
        post.id.toString().startsWith(searchValue)
      ) {
        return true;
      }
    });
    renderPosts(filteredPosts);
  });
}
