const makePost = async (event) => {
    event.preventDefault();
    document.location.replace('/post');
  };

  document
        .querySelector("#add_new_post_button")
        .addEventListener("click", makePost)