import { API_URL } from "../../settings.js";
import {sanitizeStringWithTableRows, makeOptionsToken, handleHttpErrors} from "../../utils.js";

const HOTELS_URL = API_URL + "/hotel";

export function initSpecificHotel(id) {
    const Id = Number(id)
    findHotel(Id);
}

async function findHotel(id) {
    document.getElementById("error").innerText = "";
    document.getElementById("cards-container").innerHTML = "";
    const image = "../../images/hotel.jpg";
    try {
      const options = makeOptionsToken("GET", null, false);
      const hotel = await fetch(HOTELS_URL + "/" + id, options).then(handleHttpErrors);
      const hotelData = `
          <div class="col-md-4 mb-5">
          <a href="/#/hotel/specific/${hotel.id}" data-navigo style="text-decoration: none; color: inherit;"> 
              <div class="card" style="width: 100%;">
                  <img src="${image}" class="card-img-top" alt="Image of ${hotel.name}">
                  <div class="card-body">
                      <h5 class="card-title">${hotel.name}</h5>
                      <p class="card-text">${hotel.city}</p>
                      <p class="card-text">Number of Rooms: ${hotel.numberOfRooms}</p>
                  </div>
              </div>
          </a>
      </div>
          `;
      const cardsRow = `<div class="container"><div class="row">${hotelData}</div></div>`;
  
      document.getElementById("cards-container").innerHTML = cardsRow;
    } catch (e) {
      document.getElementById("error").innerText = e.message;
    }
  }
  