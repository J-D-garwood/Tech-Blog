//new post post request
const newPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title_area').value.trim();
    const contents = document.querySelector('#content_area').value.trim();
    if (title && contents) {
        const response = await  fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify( { title, contents }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document
        .querySelector('.post')
        .addEventListener('click', newPost)