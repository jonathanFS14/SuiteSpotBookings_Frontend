import { API_URL } from "../../settings.js"
import {sanitizeStringWithTableRows, makeOptionsToken, handleHttpErrors} from "../../utils.js"

const HOTELS_URL = API_URL + "/hotel";

export function initAddHotel(match) {
    document.getElementById("submitHotel").addEventListener("click", addHotel)
}

function addHotel(){
    const hotel = {
      name: document.getElementById("Name").value,
      street: document.getElementById("Street").value,
      city: document.getElementById("City").value,
      zip: document.getElementById("Zip").value,
      country: document.getElementById("Country").value,
      phoneNumber: document.getElementById("Phonenumber").value,
      email: document.getElementById("Email").value
    }
    try {
    const options = makeOptionsToken("POST", hotel, true);
    fetch(HOTELS_URL, options)
    .then(handleHttpErrors)
    .then(hotelResponse => document.getElementById("hotelResponse").innerText = "Hotel added successfully!")
      document.getElementById("form").reset();
    } catch(e){
        document.getElementById("error").innerText = "Failed to add the hotel"
      }
      
  }