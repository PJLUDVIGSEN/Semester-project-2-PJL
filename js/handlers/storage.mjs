
/**
 * saves key value pairs and converts it to JSON text to localstorage for saving user data
 * @param  {string} key
 * @param  {*} value
 * @param  {} {localStorage.setItem(key
 * @param  {} JSON.stringify(value
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}



/**function which grabs defined key and returns its value, useful for authorization to the API
 * @param  {string} key
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key)
    return JSON.parse(value);
  } catch {
    return null
  }
}

