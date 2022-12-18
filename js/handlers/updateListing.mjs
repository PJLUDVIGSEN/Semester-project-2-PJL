import { updateListing } from "../api/listings/update.mjs";
import { getPost } from "../api/listings/read.mjs";

/** Form listener for the user to update data on a single and existing object(post)
 * @param  {form} form
 * @param  {string} queryString returns the paramaters of the querystring
 * @param  {string} params Returns a URLSearchParams object instance
 * @param  {number} id unique identifier to locate object
 * @param  {event} form.addEventListener listens for a submit event of the object change
 * @param  {object} post creates an object off the inputs in the update form
 * @param  {number} post.id unique identifier from the object needed to fulfill the api request
 * @param  {} if statement looks for the post.media value and because it is required for a post upload, to bypass this deletes it if it returns null
 * @param  {function} updateListing function which takes a paramater of the new updated object and sends a put request to the api
 */
export async function updateFormListener() {
  const form = document.querySelector("#createForm");
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());
      post.id = id;
      if (!post.media || post.media === "") {
        delete post.media;
      }
      updateListing(post);
    });
  }
}

/** Takes an object with an id identifier and fills the corresponding values with inputs in the updateForm
 * @param  {number} id unique paramater of chosen object
 * @param  {form} form targets a form to post data
 * @param  {object} post grabs the object with the target id parameter
 * @param  {string} form.media.value targets the specific corresponding input in the form and fills it with object data
 * @param  {string} form.title.value targets the specific corresponding input in the form and fills it with object data
 * @param  {string} form.body.value targets the specific corresponding input in the form and fills it with object data
 * @param  {string} form.tags.value targets the specific corresponding input in the form and fills it with object data
 */
export async function fillForm(id) {
  const form = document.querySelector("#createForm");
  const post = await getPost(id);
  form.media.value = post.media;
  form.title.value = post.title;
  form.body.value = post.body;
  form.tags.value = post.tags;
}
