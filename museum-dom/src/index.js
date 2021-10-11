import './style.scss';
document.getElementById('tickets__buynow').onclick = function openForm() {
  document.getElementById("tickets__form").style.display = "block";
  document.getElementById("cover").style.display = "block";
}

document.getElementById('cover').onclick =  function closeForm() {
    document.getElementById("tickets__form").style.display = "none";
    document.getElementById("cover").style.display = "none";
}

document.getElementById('closeButton').onclick =  function closeForm() {
  document.getElementById("tickets__form").style.display = "none";
  document.getElementById("cover").style.display = "none";
}



  const navLink = document.querySelectorAll("#nav-link");
  /* anchor links*/
  let anchorlinks = document.querySelectorAll('a[href^="."]')
  
  for (let item of anchorlinks) { // relitere 
      item.addEventListener('click', (e)=> {
      let hashval = item.getAttribute('href')
      let target = document.querySelector(hashval)
      target.scrollIntoView({
        behavior: 'smooth'
      })
      history.pushState(null, null, hashval)
      e.preventDefault()
    })
  }


  //slider carousel
  

  //map

  mapboxgl.accessToken =
    "pk.eyJ1IjoiZWx5Z28iLCJhIjoiY2t1bWJwaG00MGQ0czJ2cGkzb2E2ejk5MyJ9.hHK_wg9p3siu4-QgOZmHmg";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/light-v10", // style URL
    center: [2.335, 48.8605], // starting position [lng, lat]
    zoom: 15, // starting zoom
  });

  map.addControl(new mapboxgl.NavigationControl());
  const marker1 = new mapboxgl.Marker({color: "#858585"}).setLngLat([2.3364, 48.86091]).addTo(map);
  const marker2 = new mapboxgl.Marker({color: "#858585"}).setLngLat([2.3333, 48.8602]).addTo(map);
  const marker3 = new mapboxgl.Marker({color: "#858585"}).setLngLat([2.3397, 48.8607]).addTo(map);
  const marker4 = new mapboxgl.Marker({color: "#858585"}).setLngLat([2.3330, 48.8619]).addTo(map);
  const marker5 = new mapboxgl.Marker({color: "#858585"}).setLngLat([2.3365, 48.8625]).addTo(map);
  