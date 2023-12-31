//logout post request
const userLogout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
}
if (document.querySelector('#logout')) {
    document.querySelector('#logout').addEventListener('click', userLogout);
}
