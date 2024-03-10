export function initHome() {
    document.getElementById("spiral").innerHTML = "";
    document.getElementById("spiral2").innerHTML = "";
    logoSprial();
    initializeCarousel();
}

function logoSprial(){
    const words = "Suite Spot Bookings"; 
    const animationDuration = 4000; // 4 seconds

     words.split("").forEach((char, i) => {
        function createElement(offset){
            const div = document.createElement("div");
            div.innerText = char;
            div.classList.add("character");
            div.style.animationDelay = `-${i * (animationDuration / 16) - offset}ms`;
            return div;
        }
        document.getElementById("spiral").append(createElement(0));
        document.getElementById("spiral2").append(createElement(-1 * (animationDuration / 2)));
    })

}

function initializeCarousel() {
    var myCarouselElement = document.getElementById('carouselIndicators');
    if (myCarouselElement) {
      var myCarousel = new bootstrap.Carousel(myCarouselElement, {
        interval: 10000,
        ride: 'carousel'
      });
    } else {
      console.error('Carousel element not found');
    }
  }