import { load } from "../../handlers/storage.mjs";
import { API_HOST_URL, API_LISTINGS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
const action = "/posts";



/**
 * function that takes postdata in as a value and creates a post object for the api to store
 * @param  {object} postData object with data
 * @param  {string} createPostURL url to connect to the api
 */
export async function createData(postData) {
  const createPostURL = API_HOST_URL + API_LISTINGS;
  const response = await authFetch(createPostURL, {
    method: "post",
    body: JSON.stringify(postData),
  });
  const post = await response.json();
  console.log(post);
  return post;
}

export async function makeBid(bidData) {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  const getPostURL = `${API_HOST_URL}${API_LISTINGS}/${id}/bids`;

  const response = await authFetch(getPostURL, {
    method: "post",
    body: JSON.stringify(bidData),
  });
  const singlePost = await response.json();
  console.log(singlePost)
  return singlePost;
}