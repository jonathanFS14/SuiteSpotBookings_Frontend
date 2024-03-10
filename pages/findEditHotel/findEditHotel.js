import { API_URL } from "../../settings.js"
import {sanitizeStringWithTableRows, makeOptionsToken, handleHttpErrors} from "../../utils.js"

const HOTELS_URL = API_URL + "/hotel";

export function initFindEditHotel(){
document.getElementById("fetchHotel").addEventListener("click", findHotel)
document.getElementById("editHotel").addEventListener("click", editHotel)
document.getElementById("deleteHotel").addEventListener("click", deleteHotel)
}

async function findHotel(){
  document.getElementById("error").innerText = ""
  document.getElementById("succes").innerText = ""
  const form = document.getElementById('hotelForm');
  const id = document.getElementById("hotelId").value
  try {
    const options = makeOptionsToken("GET", null, true);
  const hotel = await fetch(HOTELS_URL + "/admin/" + id, options)
  .then(handleHttpErrors)
      form.Name.value = hotel.name;
      form.Street.value = hotel.street;
      form.City.value = hotel.city;
      form.Zip.value = hotel.zip;
      form.Country.value = hotel.country;
      form.Phonenumber.value = hotel.phoneNumber;
      form.Email.value = hotel.email;
} catch(e){
  document.getElementById("error").innerText = e.message
}
}

async function editHotel(evt){
    evt.preventDefault();
    const id = document.getElementById("hotelId").value
    const form = document.getElementById('hotelForm');
      const updatedHotel = {
      name: document.getElementById("Name").value,
      street: document.getElementById("Street").value,
      city: document.getElementById("City").value,
      zip: document.getElementById("Zip").value,
      country: document.getElementById("Country").value,
      phoneNumber: document.getElementById("Phonenumber").value,
      email: document.getElementById("Email").value
      };
  
      const options = makeOptionsToken("PUT", updatedHotel, true);
      fetch(HOTELS_URL + "/" + id, options)
      .then(handleHttpErrors)
      .then(response => document.getElementById("succes").innerText = "Hotel updated successfully!")
    
      form.reset();
}

async function deleteHotel(evt){
  evt.preventDefault();
  const id = document.getElementById("hotelId").value
  const options = makeOptionsToken("DELETE", null, true);
  fetch(HOTELS_URL + "/" + id, options)
  .then(handleHttpErrors)
  .then(response => document.getElementById("succes").innerText = "Hotel deleted successfully!")
  .catch(err => document.getElementById("error").innerText = err)
  const form = document.getElementById('hotelForm');
  form.reset();

}
