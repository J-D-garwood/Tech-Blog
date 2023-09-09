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
    .querySelector('.comment-form')
    .addEventListener('submit', newComment);
