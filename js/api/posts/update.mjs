import { API_HOST_URL, API_LISTINGS, API_PROFILE } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "put";

/**
 * @param  {object} postData Object with data created from form inputs
 * @param  {string} updatePostURL url to the api with parameters to target
 * @param  {string} method "put" which allows a user with authentication to edit postdata
 * @returns {object} returns updated object with postdata
 */
export async function updatePost(postData) {
  const updatePostURL = `${API_HOST_URL}${API_LISTINGS}/${postData.id}`;

  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  });

  const update = await response.json();

  return update;
}
