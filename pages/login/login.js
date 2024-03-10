import { API_URL } from '../../settings.js'
import { handleHttpErrors } from '../../utils.js'
import { passwordCheckbox } from '../signup/signup.js';


export function initLogin() {
  document.getElementById("form").addEventListener("submit", login);
  document .getElementById("checkbox").addEventListener("click", passwordCheckbox);
  document.getElementById("error").innerText = ""
  document.getElementById("username").value = ""
  document.getElementById("password").value = ""
}

async function login(event) {
    event.preventDefault();
    document.getElementById("error").innerText = ""
    const loginRequest = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }
    const options = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(loginRequest)
    }
    try {
      const res = await fetch(API_URL + "/auth/login", options).then(r => handleHttpErrors(r))
      storeLoginDetails(res)
      window.router.navigate("/")
    } catch (err) {
      document.getElementById("error").innerText = err.message
    }
  }

  /**
 * Store username, roles and token in localStorage, and update UI-status
 * @param res - Response object with details provided by server for a succesful login
 */
function storeLoginDetails(res) {
    localStorage.setItem("token", res.token)
    localStorage.setItem("user", res.username)
    localStorage.setItem("roles", res.roles)
    toggleLoginStatus(true)
  }
  
  
  export function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("roles")
    toggleLoginStatus(false)
    window.router.navigate("/")
  }
  
  export function toggleLoginStatus(loggedIn) {
    document.getElementById("login-container").style.display = loggedIn ? "none" : "block"
    document.getElementById("logout-container").style.display = loggedIn ? "block" : "none"
    
    const adminListItems = document.querySelectorAll('.admin-only');
    const userRoutes = document.querySelectorAll('.user-only');
    let isAdmin = false;
    let isUser = false;
    if (localStorage.getItem('roles')) {
       isAdmin = localStorage.getItem('roles').includes('ADMIN');
       isUser = localStorage.getItem('roles').includes('USER');
    }
    for (var i = 0; i < adminListItems.length; i++) {
      adminListItems[i].style.display = isAdmin ? "block" : 'none'; 
    }
    for (var i = 0; i < userRoutes.length; i++) {
      userRoutes[i].style.display = isUser ? 'block' : 'none';
    }
  }
  
