import { API_URL} from "../../settings.js"
import { makeOptionsToken, handleHttpErrors, sanitizeStringWithTableRows} from "../../utils.js"

const URL = API_URL + "/reservation"

export function initReservation() {
    document.getElementById('reservationForm').addEventListener('submit', addReservation);
    fetchReservations();
    document.getElementById("succes").innerText = "";
    document.getElementById("error").innerText = "";

}

async function addReservation(event){
    event.preventDefault();
    document.getElementById("succes").innerText = "";
    document.getElementById("error").innerText = "";

    const reservation = {
        roomId: document.getElementById('roomId').value,
        reservationDateStart: document.getElementById('reservationDateStartDate').value, 
        reservationDateEnd: document.getElementById('reservationDateEndDate').value
    };

    const options = makeOptionsToken("POST", reservation, true);
    fetch(URL, options)
    .then(handleHttpErrors)
    .then(data =>  document.getElementById('succes').innerText = 'Reservation successful')
    .catch(err => document.getElementById("error").innerText = err) 
    setTimeout(() => {
        fetchReservations();
    }, 1000);
}

async function fetchReservations() {
    try {
        const options = makeOptionsToken("GET", null, true);
        const reservations = await fetch(URL, options)
            .then(handleHttpErrors);

        const listItems = reservations.map((reservation, index) => `
            <tr> 
                <td>${reservation.user.username}</td>
                <td>${reservation.room.roomNumber}</td>
                <td>${reservation.reservationDateStart}</td>
                <td>${reservation.reservationDateEnd}</td>
                <td>
                    <button id="deleteBtn-${index}" class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `).join("");
        const tableRows = document.getElementById("table-rows");
        tableRows.innerHTML = sanitizeStringWithTableRows(listItems);
        reservations.forEach((reservation, index) => {
            document.getElementById(`deleteBtn-${index}`).addEventListener('click', () => {
                deleteReservation(reservation.id);
            });
        });
    } catch(e) {
        document.getElementById("error").innerText = "Failed to fetch";
    }
}

 function deleteReservation(reservationId) {
    const options = makeOptionsToken("DELETE", null, true);
    fetch(URL + "/" + reservationId, options)
    .then(handleHttpErrors)
    .catch(err => document.getElementById("error").innerText = err)
    setTimeout(() => {
        fetchReservations();
    }, 1000);
}

