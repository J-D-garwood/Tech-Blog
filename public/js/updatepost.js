// update post PUT request
const updatePost = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    const title = document.querySelector('#title_area').value.trim();
    const contents = document.querySelector('#content_area').value.trim();
    if (title && contents) {
        document.location.replace(`/post/${id}`);
        const response = await  fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify( { title, contents }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.replace(`/post/${id}`);
        } else {
            alert(response.statusText);
        }
    }
}

document
        .querySelector('.update')
        .addEventListener('click', updatePost)