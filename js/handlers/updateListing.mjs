import { updateListing } from "../api/listings/update.mjs";
import { getPost } from "../api/listings/read.mjs";


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
