import {load} from "../handlers/storage.mjs"


/**
 * function to store user headers
 * @param  {string} token grabs the users authorization token used to access the api which is stored in local.storage
 * @returns {object} returns key value pairs with content type and authorization erady to be passed on to api
 */
export function headers() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
}


/**
 * function to fetch the result of the api request with dynamic headers and options.
 * @param  {string} url string used to access the API
 * @param  {string} options 
 * @returns {object} returns a response from the api with a result determined by the parameters
 */

export async function authFetch(url, options) {
  return fetch(url, {
    ...options,
    headers: headers()
  })
}