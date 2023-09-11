const deletePost = async (event) => {
    window.location.replace('/dashboard');  
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        window.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  }
if (document.querySelector('.delete_post')) {
  document
  .querySelector('.delete_post')
  .addEventListener('click', deletePost);
}

const updatePost = async (event) => {
  console.log("working")
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    window.location.replace(`/updatepost/${id}`);
  }
};
if (document.querySelector('.update_post')) {
  document
    .querySelector('.update_post')
    .addEventListener('click', updatePost);
}

const newComment = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const postId = parseInt(id)
    const comment = document.querySelector('#comment-content').value.trim();
    if (comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify( { comment, postId}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace(`/post/${id}`);
        } else {
            alert('Failed to save comment')
        }
    }
};
document
    .querySelector('#submit-comment')
    .addEventListener('click', newComment);
