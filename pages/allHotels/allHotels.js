import { API_URL } from "../../settings.js";
import {sanitizeStringWithTableRows, makeOptionsToken, handleHttpErrors} from "../../utils.js";

const HOTELS_URL = API_URL + "/hotel";

let pageSize = 9;
let sortColumn = "city";
let sortDirection = "asc";
let queryString;
let isInitialized = false;

export async function initAllHotels(match) {
  const queryParams = match.query || {};
  const page = parseInt(queryParams.page, 10) || 0;
  pageSize = parseInt(queryParams.pageSize, 9) || 9;
  sortColumn = queryParams.sortColumn || "city";
  sortDirection = queryParams.sortDirection || "asc";

  if (!isInitialized) {
    isInitialized = true;
    document.querySelector("#pagination").addEventListener("click", handlePaginationClick);
    document.getElementById("sort-by").addEventListener("change", handleSortClick);
  }
  document.getElementById("search-hotel").addEventListener("click", findHotel);
  fetchData(Number(page));
}

async function displayDataCard(hotels) {
  document.getElementById("error").innerText = "";
  const image = "../../images/hotel.jpg";
  const cards = hotels
    .map(
      (hotel) => `
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
    `
    )
    .join("");
  const cardsRow = `<div class="container"><div class="row">${cards}</div></div>`;
  document.getElementById("cards-container").innerHTML = cardsRow;
}

async function fetchData(page = 0) {
  const size = pageSize;
  queryString = `?page=${page}&size=${size}&sort=${sortColumn},${sortDirection}`;
  const data = await fetch(`${HOTELS_URL}${queryString}`).then((res) =>
    res.json()
  );
  /*displayData(data.content);*/
  displayDataCard(data.content);
  displayPagination(data.totalPages, page);
  const navigoRoute = "hotels";
  window.router?.navigate(`/${navigoRoute}${queryString}`, {
    callHandler: false,
    updateBrowserURL: true,
  });
}

function displayPagination(totalPages, currentPage) {
  let paginationHtml = "";
  if (currentPage > 0) {
    // Previous Page
    paginationHtml += `<li class="page-item"><a class="page-link" data-page="${
      currentPage - 1
    }" href="#">Previous</a></li>`;
  }
  // Display page numbers
  let startPage = Math.max(0, currentPage - 2);
  let endPage = Math.min(totalPages - 1, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    if (i === currentPage) {
      paginationHtml += `<li class="page-item active"><a class="page-link" href="#">${
        i + 1
      }</a></li>`;
    } else {
      paginationHtml += `<li class="page-item"><a class="page-link" data-page="${i}" href="#">${
        i + 1
      }</a></li>`;
    }
  }
  if (currentPage < totalPages - 1) {
    // Next Page
    paginationHtml += `<li class="page-item"><a class="page-link" data-page="${
      currentPage + 1
    }" href="#">Next</a></li>`;
  }
  document.getElementById("pagination").innerHTML = paginationHtml;
}

function handlePaginationClick(evt) {
  evt.preventDefault();
  if (evt.target.tagName === "A" && evt.target.hasAttribute("data-page")) {
    const page = parseInt(evt.target.getAttribute("data-page"));
    fetchData(page);
  }
  window.scrollTo(0, 0);
}

function handleSortClick(evt) {
  const target = evt.target;
  if (!target.id.startsWith("sort-")) {
    return;
  }
  if (target.id === "sort-city") {
    sortColumn = "city";
  }
  sortDirection = target.dataset.sort_direction === "asc" ? "desc" : "asc";
  target.dataset.sort_direction = sortDirection;
  fetchData();
}

async function findHotel() {
  document.getElementById("error").innerText = "";
  document.getElementById("cards-container").innerHTML = "";
  const id = document.getElementById("hotelId").value;
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
