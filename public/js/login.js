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
        console.log(JSON.stringify({ username, password }))
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

if (document.querySelector(".login")) {
    document
    .querySelector(".login")
    .addEventListener('submit', userLogin);
} else {
    document
    .querySelector(".sign-up")
    .addEventListener('submit', userSignUp);
}