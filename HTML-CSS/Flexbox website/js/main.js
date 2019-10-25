// Sticky menu background
window.addEventListener('scroll', function() {
    if (window.scrollY > 150) {
      document.querySelector('#navbar').style.opacity = 0.8;
    } else {
      document.querySelector('#navbar').style.opacity = 1;
    }
  });
  
  
  // Smooth Scrolling
  $('#navbar a, .btn').on('click', function(event) {
    if (this.hash !== '') {
      event.preventDefault();
  
      const hash = this.hash;
  
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top - 66
        },
        1200
      );
    }
  });










// // Initialize and add the map
// function initMap() {
//     // my location
//     const loc = { lat: 37.7510, lng: -97.8220 };
//     // centered map on location
//     const map = new google.maps.Map(document.querySelector('.map'), 
//     {
//         zoom: 14,
//         center: loc
//     });
//     // The maker, positioned at location
//     const maker = new google.maps.Maker({ position: loc, map: map
//     });
// }