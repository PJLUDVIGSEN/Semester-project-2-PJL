import { API_HOST_URL, API_LISTINGS } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
const method = "delete";


export async function removeListing(id) {
  const removeListingURL = `${API_HOST_URL}${API_LISTINGS}/${id}`;
  const response = await authFetch(removeListingURL, {
    method,
  });
  const remove = await response.json();

  return remove;
}
