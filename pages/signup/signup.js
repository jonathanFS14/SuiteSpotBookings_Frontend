import { API_URL } from "../../settings.js";
import { makeOptionsToken, handleHttpErrors } from "../../utils.js";

const URL = API_URL + "/user";

export function initSignup() {
  document .getElementById("checkbox").addEventListener("click", passwordCheckbox);
  document.getElementById("succes").innerText = "";
  document.getElementById("error").innerText = "";
  document.getElementById("form").addEventListener("submit", signUp);
}

export function passwordCheckbox() {
  var Password = document.getElementById("password");
  if (Password.type === "password") {
    Password.type = "text";
  } else {
    Password.type = "password";
  }
}

async function signUp(event) {
  event.preventDefault();
  document.getElementById("succes").innerText = "";
  document.getElementById("error").innerText = "";
  var username = document.getElementById("Username").value;
  var email = document.getElementById("your_email").value;
  var password = document.getElementById("password").value;
  var firstName = document.getElementById("first_name").value;
  var lastName = document.getElementById("last_name").value;
  var street = document.getElementById("street").value;
  var city = document.getElementById("city").value;
  var zip = document.getElementById("zip").value;
  var phoneNumber = document.getElementById("phone").value;

  const member = {
    username,
    email,
    password,
    firstName,
    lastName,
    street,
    city,
    zip,
    phoneNumber,
  };

  const options = makeOptionsToken("POST", member, false);
  fetch(URL, options)
    .then(handleHttpErrors)
    .then(Response => {
      document.getElementById("succes").innerText = "User successfully created";
      window.scrollTo(0,0);
      document.getElementById("form").reset();
      setTimeout(() => {
        router.navigate("/login");
      }, 2000); //2 seconds
  })
  .catch(error => {
    const errorMessage = error.message;
    document.getElementById("error").innerHTML = errorMessage;
    if (errorMessage.includes("Email already exists")) {
      const mail = document.getElementById("your_email");
      mail.value = ""; 
    } else if (errorMessage.includes("Username already exists")) {
      const usernameField = document.getElementById("Username");
      usernameField.value = ""; 
    }
  });
  window.scrollTo(0,0);
}
