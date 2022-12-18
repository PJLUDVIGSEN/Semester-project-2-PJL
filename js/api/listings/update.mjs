import { API_HOST_URL, API_LISTINGS, API_PROFILE } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const method = "put";

/**
 * @param  {object} listingData Object with data created from form inputs
 * @param  {string} updateListingURL url to the api with parameters to target
 * @param  {string} method "put" which allows a user with authentication to edit listingData
 * @returns {object} returns updated object with listingData
 */
export async function updateListing(listingData) {
  const updateListingURL = `${API_HOST_URL}${API_LISTINGS}/${listingData.id}`;

  const response = await authFetch(updateListingURL, {
    method,
    body: JSON.stringify(listingData),
  });

  const update = await response.json();

  return update;
}
