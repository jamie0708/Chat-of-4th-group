const usernameInput = document.getElementById('usernameInput')
const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passwordInput')
const uploadInput = document.getElementById('uploadInput')
const submitButton = document.getElementById('submitButton')
const showButton = document.getElementById('showButton')

const API = "http://localhost:7777"

function getFiles(event) {
    console.log(event.target.files)
}

try {
    
    submitButton.addEventListener('click',
        async (e) => {
            e.preventDefault();

            let userData = new FormData();
            userData.append("avatar", uploadInput.files[0]);
            userData.append("email", emailInput.value);
            userData.append("first_name",  usernameInput.value);
            userData.append("password", passwordInput.value);

            let responce = await fetch(`${API}/register`, {
                method: 'POST',
                body: userData                
            })
            const content = await responce.json();

            console.log(content);
            window.localStorage.setItem("token", content.token);
            window.localStorage.setItem("message", content.message);
            if (content.token) {
                window.location.replace('login.html');
            }
        });
} catch (error) {
    alert(error.message)
}

showButton.addEventListener('click', () => {
    passwordInput.type == "password" ? passwordInput.type = "text" : passwordInput.type = "password";
})