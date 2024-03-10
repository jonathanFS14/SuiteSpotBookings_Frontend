import { API_URL} from "../../settings.js"
import { makeOptionsToken, handleHttpErrors, sanitizeStringWithSpan} from "../../utils.js"
import { logout } from "../login/login.js"

const URL = API_URL + "/user"

export function initProfile() {
    document.getElementById("error").innerText = ""
    document.getElementById("succes").innerText = ""
    document.getElementById("deleteUser").addEventListener("click", deleteUser);
    fetchUser();
    document.getElementById("form").addEventListener("submit", updateUser);

}

function updateUser(event){
    document.getElementById("error").innerText = ""
    document.getElementById("succes").innerText = ""
    event.preventDefault();
      const updatedUser = {
        email: document.getElementById("your_email").value,
        firstName: document.getElementById("first_name").value,
        lastName: document.getElementById("last_name").value,
        street: document.getElementById("street").value,
        city: document.getElementById("city").value,
        zip: document.getElementById("zip").value,
        phoneNumber: document.getElementById("phone").value
      };
      const options = makeOptionsToken("PUT", updatedUser, true);
      fetch(URL, options)
      .then(handleHttpErrors)
      .then(response => {
        document.getElementById("succes").innerText = "User updated successfully!"
        const form = document.getElementById("form");
        form.reset();
       })
      .catch(error => {
        const errorMessage = error.message;
        document.getElementById("error").innerHTML = errorMessage;
        if (errorMessage.includes("Email already exists")) {
          const mail = document.getElementById("your_email");
          mail.value = ""; 
        } 
      });
      setTimeout(() => {
        fetchUser();
      }, 2000); //2 seconds
      
}

function deleteUser(){
    document.getElementById("error").innerText = ""
    document.getElementById("succes").innerText = ""
    const options = makeOptionsToken("DELETE", null, true);
    fetch(URL, options)
    .then(handleHttpErrors)
    .then(l => logout())
    .catch(err => document.getElementById("error").innerText = err)
}

async function fetchUser() {
    try {
        const options = makeOptionsToken("GET", null, true);
        const user = await fetch(URL, options)
            .then(handleHttpErrors);
        const userData = `
        <div class="row">
        <span class="font-weight-bold pt-2">${user.username}</span>
        </div>
        <div class="row">
        <span class="text-black-50 pt-2">${user.firstName}</span>
        </div>
        <div class="row">
        <span class="text-black-50 pt-2">${user.lastName}</span>
        </div>
        <div class="row">
        <span class="text-black-50 pt-2">${user.email}</span>
        </div>
        <div class="row">
        <span class="text-black-50 pt-2">${user.phoneNumber}</span>
        </div>
        <div class="row">
        <span class="text-black-50 pt-2">${user.street}</span>
        </div>
        <div class="row">
        <span class="text-black-50 pt-2">${user.city}</span>
        </div>
        <div class="row">
        <span class="text-black-50 pt-2">${user.zip}</span>
        </div>
        `;
        document.getElementById("userData").innerHTML = sanitizeStringWithSpan(userData);
    } catch(e) {
        document.getElementById("error").innerText = "Failed to fetch";
    }

}

