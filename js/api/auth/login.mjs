import { API_LOGIN, API_HOST_URL } from "../constants.mjs";
import * as storage from "../../handlers/storage.mjs"
const action = "/auth/login";
const method = "post";

/**
 * Authenticates userlogin and creates an object that can store the uservalues in local.storage
 * @param {object} profile 
 */

export async function login(profile) {
  const userUrl = API_HOST_URL + API_LOGIN;
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