const form = document.querySelector(".form-registration")
const password = document.querySelector(".password")
const email = document.querySelector(".email")

const API_KEY = "8da5deb2-2473-44cf-b6c7-cc25dbc0329f"
const URL_BASE = "https://api.restful-api.dev/"

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (password.value.trim() && email.value.trim()) {
        const newData = {
            password: password.value,
            email: email.value,
        }
        loginFucn(newData)

    }
    else {
        alert("Заполните все поля")
    }
})


async function loginFucn(data) {
    try {
        const response = await fetch(URL_BASE + "login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify(data)
        });


        const result = await response.json();


        if (result.token && response.status == 200) {
            localStorage.setItem("user", JSON.stringify(result))
            form.reset()
            window.location.href = "dashboard.html"
        }
        return result


    }
    catch (error) {
        alert("ошибкa" + message.error)
        console.error(error);
    }
}

