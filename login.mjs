import * as storage from "/storage.mjs"
import { API_HOST_URL } from "./js/constants.mjs";
const method = "post";
const action = "/auth/login";
/**
 * Authenticates userlogin and creates an object that can store the uservalues in local.storage
 * @param {object} profile 
 */

export async function login(profile) {
  const userUrl = API_HOST_URL + action;
  const response = await fetch(userUrl, {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body: JSON.stringify(profile)
  })

  const {accessToken, ...user} = await response.json()
  storage.save("token", accessToken);
  storage.save("user", user);

}