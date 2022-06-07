const usernameInputLog = document.getElementById('usernameInputLog')
const passwordInputLog = document.getElementById('passwordInputLog')
const submitButtonLog = document.getElementById('submitButtonLog')
const showButtonLog = document.getElementById('showButtonLog');

const API = "http://localhost:7777"

try {
    submitButtonLog.addEventListener('click',
        (async (e) => {
            e.preventDefault();
            const Response = await fetch(`${API}/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: usernameInputLog.value,
                    password: passwordInputLog.value
                })
            })
            const content = await Response.json();

            console.log(content);
            window.localStorage.setItem("token", content.token);
            window.localStorage.setItem("message", content.message);
            if (content.token) {
                window.location.replace('index.html');
            }
        }));

} catch (error) {
    alert(error.message);
}
showButtonLog.addEventListener('click', () => {
    passwordInputLog.type == "password" ? passwordInputLog.type = "text" : passwordInputLog.type = "password";
})