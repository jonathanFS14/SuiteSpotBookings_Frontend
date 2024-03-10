import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"

import {
  setActiveLink, renderHtml, loadHtml
} from "./utils.js"



const token = localStorage.getItem("token")
toggleLoginStatus(token)

import { initAllHotels } from "./pages/allHotels/allHotels.js";
import { initAddHotel } from "./pages/addHotel/addHotel.js";
import { initFindEditHotel } from "./pages/findEditHotel/findEditHotel.js";
import { initSpecificHotel } from "./pages/specificHotel/specificHotel.js";
import { initAddRoom } from "./pages/addRoom/addRoom.js";
import { initLogin, logout, toggleLoginStatus } from "./pages/login/login.js"
import { initSignup } from "./pages/signup/signup.js"
import { initReservation } from "./pages/reservation/reservation.js"
import { initHome } from "./pages/Home/home.js"
import { initAbout } from "./pages/about/about.js"
import { initTermsAndConditions } from "./pages/termsAndConditions/termsAndConditions.js"
import { initProfile } from "./pages/profile/profile.js"


window.addEventListener("load", async () => {

  const templateAbout = await loadHtml("./pages/about/about.html")
  const templateHome = await loadHtml("./pages/home/home.html")
  const templateAllHotels = await loadHtml("./pages/allHotels/allHotels.html")
  const templateaddHotel = await loadHtml("./pages/addHotel/addHotel.html")
  const templateFindEditHotel = await loadHtml("./pages/findEditHotel/findEditHotel.html")
  const templateSpecificHotel = await loadHtml("./pages/specificHotel/specificHotel.html")
  const templateAddRoom = await loadHtml("./pages/addRoom/addRoom.html")
  const templateLogin = await loadHtml("./pages/login/login.html")
  const templateSignup = await loadHtml("./pages/signup/signup.html")
  const templateReservation = await loadHtml("./pages/reservation/reservation.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")
  const templateTermsAndConditions = await loadHtml("./pages/termsAndConditions/termsAndConditions.html")
  const templateProfile = await loadHtml("./pages/profile/profile.html")

  const router = new Navigo("/",{hash:true});
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router
 
  
  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      "/": () => {
      renderHtml(templateHome, "content")
      initHome()
      },
      "/about": () => {
        renderHtml(templateAbout, "content")
        initAbout()
      },
      "/hotels": (match) => {
       renderHtml(templateAllHotels, "content")
        initAllHotels(match)
      },
      "/addHotel": () => {
        renderHtml(templateaddHotel, "content")
        initAddHotel()
      },
      "/delete-edit-Hotel": () => {
        renderHtml(templateFindEditHotel, "content")
        initFindEditHotel()
      },
      "/hotel/specific/:id": (match) => {
        renderHtml(templateSpecificHotel, "content")
        initSpecificHotel(match.data.id)
      },
      "/addRoom": () => {
        renderHtml(templateAddRoom, "content")
        initAddRoom()
      },
      "/reservation": () => {
        renderHtml(templateReservation, "content")
        initReservation()
      },  
      "/signup": () => {
        renderHtml(templateSignup, "content")
        initSignup()
      },
      "/login": () => {
        renderHtml(templateLogin, "content")
        initLogin()
      },
      "/logout": () => {
        renderHtml(templateLogin, "content")
        logout()
      }, 
      "/profile": () => {
        renderHtml(templateProfile, "content")
        initProfile()
      }, 
      "/termsandconditions": () => {
        renderHtml(templateTermsAndConditions, "content")
        initTermsAndConditions()
      }
    })
    .notFound(() => {
      renderHtml(templateNotFound, "content")
    })
    .resolve()
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}
