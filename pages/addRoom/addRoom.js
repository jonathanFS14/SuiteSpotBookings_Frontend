import { API_URL } from "../../settings.js"
import {sanitizeStringWithTableRows, makeOptionsToken, handleHttpErrors} from "../../utils.js"

const HOTELS_URL = API_URL + "/room";

export function initAddRoom(match) {
    document.getElementById('addRoomForm').addEventListener('submit', addRoom)
}

async function addRoom(){
    event.preventDefault();
    const room = {
        roomNumber: document.getElementById('roomNumber').value,
        floor: document.getElementById('floor').value,
        numberOfBeds: document.getElementById('numberOfBeds').value,
        roomType: document.getElementById('roomType').value,
        roomPrice: document.getElementById('roomPrice').value,
        roomDescription: document.getElementById('roomDescription').value,
        hotelId: parseInt(document.getElementById('hotelId').value),
    };
    try {
        const options = makeOptionsToken("POST", room, true);
        fetch(HOTELS_URL, options)
        .then(handleHttpErrors)
        .then( 
          hotelResponse => document.getElementById("RoomResponse")
          .innerText = JSON.stringify(hotelResponse, null, 3))
          .catch(err => document.getElementById("error").innerText = err)
          document.getElementById("addRoomForm").reset();
        } catch(e){
            document.getElementById("error").innerText = e.message
          }
}

