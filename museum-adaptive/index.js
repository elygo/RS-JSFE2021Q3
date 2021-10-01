function openForm() {
    document.getElementById("tickets__form").style.display = "block";
    document.getElementById("cover").style.display = "block";
}
  
function closeForm() {
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