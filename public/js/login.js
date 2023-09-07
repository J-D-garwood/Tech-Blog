const { use } = require("../../controllers");

const login = document.querySelector(/*Insert login element ID*/);
const signUp = document.querySelector(/*Insert login element ID*/);

const userLogin = async (event) => {
    event.preventDefault();
    const username = document.querySelector(/*Insert username login element ID*/).value.trim();
    const password = document.querySelector(/*Insert password login element ID*/).value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password}),
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
    const username = document.querySelector(/*Insert username sign up element ID*/).value.trim();
    const password = document.querySelector(/*Insert password sign up element ID*/).value.trim();

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