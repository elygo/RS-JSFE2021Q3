import "./owfont-regular.scss";
import "./style.scss";

const date = document.querySelector(".date"),
  time = document.querySelector(".time"),
  greeting = document.querySelector(".greeting"),
  name = document.querySelector(".name"),

  city = document.querySelector('.city'),
  weatherError = document.querySelector('.weather-error'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  weatherIcon = document.querySelector('.weather-icon'),
  humidity = document.querySelector('.humidity'),
  wind = document.querySelector('.wind'),

  // prevSlide = document.querySelector('.slide-prev'),
  // nextSlide = document.querySelector('.slide-next'),

  quote = document.querySelector(".quote"),
  author = document.querySelector(".author"),
  buttonQuote = document.querySelector(".change-quote");

function showTime() {
  let today = new Date(),
    currentTime = today.toLocaleTimeString();

  time.innerHTML = `${currentTime}`;

  setTimeout(showTime, 1000);
}

function showDate() {
  let optionsWeekday = { weekday: "long" },
    optionsMonth = { month: "long" },
    today = new Date(),
    month = new Intl.DateTimeFormat("en-US", optionsMonth).format(),
    day = today.getDate(),
    weekday = new Intl.DateTimeFormat("en-US", optionsWeekday).format();

  date.innerHTML = `${weekday}<span>, </span> ${month}<span> </span>${day}`;

  setTimeout(showDate, 100000);
}

function showGreeting () {
  const date = new Date();
  const hours = date.getHours();

  function getTimeOfDay(hours) {
    if (hours < 6) {
      return 'night';
    } else if (hours < 12) {
      return 'morning';
    } else if (hours < 18) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  }
  const timeOfDay = getTimeOfDay(hours);
  const greetingText = `Good ${timeOfDay}`;

  greeting.textContent = greetingText;
    
}

function inputName() {
  if (localStorage.getItem('name') === null){
    name.value = '[Enter name]';
  } else {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', inputName);

function setName(e) {
  if( localStorage.getItem('name') === undefined || localStorage.getItem('name') === null || localStorage.getItem('name') === '[Enter name]'){
    localStorage.setItem('name', '[Enter name]'); 
  }
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keycode == 13) {
      localStorage.setItem ('name', e.target.value);
      name.blur();
      if(!localStorage.getItem('name').trim().length){
        localStorage.setItem('name', '[Enter name]');
        name.value = localStorage.getItem('name');
      } 
    }
  } else {
    localStorage.setItem('name', name.value);
  }
}

window.addEventListener('beforeunload', setName);

function inputCity() {
  if (localStorage.getItem('city') === null){
    city.value = 'Minsk';
  } else {
    city.value = localStorage.getItem('city');
  }
}

function setCity(e) {
  if( localStorage.getItem('city') === undefined || localStorage.getItem('city') === null || localStorage.getItem('city') === 'Minsk'){
    localStorage.setItem('city', 'Minsk'); 
  } 
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keycode == 13) {
      localStorage.setItem('city', e.target.value);
      setWeather();
      city.blur();
      if(!localStorage.getItem('city').trim().length){
        localStorage.setItem('city', 'Minsk');
        city.value = localStorage.getItem('city');
      } 
      }
  } else {
    localStorage.setItem('city', city.value);
  }
}

async function setWeather(){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&units=metric&appid=b8dd499cb4309461ecdeb2cde84fb749`;
  const res = await fetch(url);
  const data = await res.json();

  city.value = `${data.name}`;
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;

  humidity.textContent = `Humidity: ${data.main.humidity} %`;
  wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
}

function changeQuote(){
    fetch("https://type.fit/api/quotes")
    .then(response => response.json())
    .then(data => {
        let ra = Math.floor(Math.random() * 1600) + 1;
        let quotes = data[ra]['text'],
            authors = data[ra]['author'];
        quote.innerHTML = `"${quotes}"`;
        author.innerHTML = authors;
    });
  }

//eventListeners
buttonQuote.addEventListener('click', changeQuote);
name.addEventListener('keypress', setName);
city.addEventListener('keypress', setCity);

//callFunctions
showTime();
showDate();
showGreeting();
inputName();
inputCity();
setWeather();
changeQuote();
