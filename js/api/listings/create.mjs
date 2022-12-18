import { API_HOST_URL, API_LISTINGS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * function that takes listingData in as a value and creates a post object for the api to store
 * @param  {object} listingData object with data
 * @param  {string} createAuctionURL url to connect to the api
 */
export async function createData(listingData) {
  const createAuctionURL = API_HOST_URL + API_LISTINGS;
  const response = await authFetch(createAuctionURL, {
    method: "post",
    body: JSON.stringify(listingData),
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
  console.log(singlePost);
  return singlePost;
}
