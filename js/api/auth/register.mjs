import { API_REGISTER, API_HOST_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";

/**
 * Authenticates user registration and creates an object that can store uservalues
 * @param  {object} profile
 */

export async function register(profile) {
  const userUrl = API_HOST_URL + API_REGISTER;
  const response = await fetch(userUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(profile)
  });
  
  const result = await response.json();
  console.log(result);
  return result
}
