const userLogin = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username_login').value.trim();
    const password = document.querySelector('#password_login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'}
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const userSignUp = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username_signup').value.trim();
    const password = document.querySelector('#password_signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password}),
            header: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document
        .querySelector(".login")
        .addEventListener('submit', userLogin);
document
        .querySelector(".sign-up")
        .addEventListener('submit', userSignUp);