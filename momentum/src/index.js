import "./owfont-regular.scss";
import "./style.scss";
import "./translation.js";
import button from "./translation.js";
import i18next from './translation.js';
import playList from './playList.js';

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

  prevSlide = document.querySelector('.slide-prev'),
  nextSlide = document.querySelector('.slide-next'),

  quote = document.querySelector(".quote"),
  author = document.querySelector(".author"),
  buttonQuote = document.querySelector(".change-quote"),

  settingsButton = document.querySelector(".settings-button"),

  playPrev = document.querySelector(".play-prev"),
  play = document.querySelector(".play"),
  playNext = document.querySelector(".play-next"),
  playListContainer = document.querySelector(".play-list");

function showTime() {
  let today = new Date(),
    currentTime = today.toLocaleTimeString();

  time.innerHTML = `${currentTime}`;

  setTimeout(showTime, 1000);
}

function showDate() {
  if (localStorage.getItem('i18nextLng') == "en"){
    let optionsWeekday = { weekday: "long" },
    optionsMonth = { month: "long" },
    today = new Date(),
    month = new Intl.DateTimeFormat("en-US", optionsMonth).format(),
    day = today.getDate(),
    weekday = new Intl.DateTimeFormat("en-US", optionsWeekday).format();
    date.innerHTML = `${weekday}<span>, </span> ${month}<span> </span>${day}`;
  } else if (localStorage.getItem('i18nextLng') == "ru") {
    let today = new Date(),
      options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    date.innerHTML = today.toLocaleDateString('ru-RU', options);
  }
  

  

  setTimeout(showDate, 100000);
}

function showGreeting () {
  const date = new Date();
  const hours = date.getHours();

  function getTimeOfDay(hours) {
    if (hours < 6) {
      return  i18next.t('night');
    } else if (hours < 12) {
      return i18next.t('morning');
    } else if (hours < 18) {
      return i18next.t('afternoon');
    } else {
      return i18next.t('evening');
    }
  }
  const timeOfDay = getTimeOfDay(hours);
  const greetingText = i18next.t('Good') + ` ${timeOfDay}`;

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
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${localStorage.getItem('i18nextLng')}&units=metric&appid=b8dd499cb4309461ecdeb2cde84fb749`;
  const res = await fetch(url);
  const data = await res.json();

  city.value = `${data.name}`;
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;

  humidity.textContent = i18next.t('humidity') + `: ${data.main.humidity} %`;
  wind.textContent = i18next.t('windSpeed') + `: ${Math.floor(data.wind.speed)} m/s`;
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
}

  let imgArray = [];
  while (imgArray.length < 21) {
    var r = Math.floor(Math.random() * 20) + 1;
    if (imgArray.indexOf(r) === -1 && r !== 0) {
      if (r.toString().length === 2) {
        imgArray.push(r.toString());
      } else {
        r = "0" + r;
        imgArray.push(r);
      }
    }
  }
  let dayTime = "";
  let togetHour = new Date(),
    hour = togetHour.getHours(),
    counter = hour + 1;

function setprevBgimage () {
  const url = 'https://raw.githubusercontent.com/elygo/stage1-tasks/assets/images/';
    if (counter <= 1) {
    counter = 20;
  }

  if (hour < 6) {
    dayTime = "night";
    document.body.style.backgroundImage = "url(" + url + dayTime + "/" + imgArray[counter] + ".jpg)";
  } else if (hour < 12) {
    dayTime = "morning";
    document.body.style.backgroundImage = "url(" + url + dayTime + "/" + imgArray[counter] + ".jpg)";
  } else if (hour < 18) {
    dayTime = "afternoon";
    document.body.style.backgroundImage = "url(" + url + dayTime + "/" + imgArray[counter] + ".jpg)";
  } else {
    dayTime = "evening";
    document.body.style.backgroundImage = "url(" + url + dayTime + "/" + imgArray[counter] + ".jpg)";
  }
  counter = counter - 1;
}

function setnextBgimage () {
  const url = 'https://raw.githubusercontent.com/elygo/stage1-tasks/assets/images/';

  if (counter >= 20) {
    counter = 0;
  }

  if (hour < 6) {
    dayTime = "night";
    document.body.style.backgroundImage = "url(" + url + dayTime + "/" + imgArray[counter] + ".jpg)";
  } else if (hour < 12) {
    dayTime = "morning";
    document.body.style.backgroundImage = "url(" + url + dayTime + "/" + imgArray[counter] + ".jpg)";
  } else if (hour < 18) {
    dayTime = "afternoon";
    document.body.style.backgroundImage = "url(" + url + dayTime + "/" + imgArray[counter] + ".jpg)";
  } else {
    dayTime = "evening";
    document.body.style.backgroundImage = "url(" + url + dayTime + "/" + imgArray[counter] + ".jpg)";
  }
  counter = counter + 1;
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

  function getLinkToImage() {
    if (hour < 6) {
      dayTime = "night";
    } else if (hour < 12) {
      dayTime = "morning";
    } else if (hour < 18) {
      dayTime = "afternoon";
    } else {
      dayTime = "evening";
    }
    const url = 'https://api.unsplash.com/photos/random?query=' + dayTime + '&orientation=landscape&client_id=tLCYkP2VKvKhw9MLbrypxMRSkbZw2pUHbnRwz3m5h-g';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        document.body.style.backgroundImage = "url(" + data.urls.regular + ")";
      });
    }

    let isPlay = false;
    const audio = new Audio();
    let playNum = 0;

    function playAudio() {
      audio.src = playList[playNum].src;
      audio.currentTime = 0;
      audio.play();
      play.classList.add('pause');
    }

    function pauseAudio() {
      play.classList.remove('pause');
      audio.pause();
    }

    play.addEventListener('click', () => {
      isPlay == false ? (playAudio(), isPlay = true) : (pauseAudio(), isPlay = false);
    })

    function prevAudio() {
      playNum--;
      if(playNum<0){
        playNum = 2;
      }
      audio.src = playList[playNum].src;
      playAudio();
    }
    playPrev.addEventListener('click', prevAudio);

    function nextAudio() {
      playNum++;
      if(playNum>2){
        playNum = 0;
      }
      audio.src = playList[playNum].src;
      playAudio();
    }
    playNext.addEventListener('click', nextAudio);
    
    for(let i = 0; i < playList.length; i++) {
      const li = document.createElement('li');
      li.classList.add('play-item');
      li.textContent = playList[i].title;
      playListContainer.append(li);
    }
    
//eventListeners
buttonQuote.addEventListener('click', changeQuote);
name.addEventListener('keypress', setName);
city.addEventListener('keypress', setCity);
prevSlide.addEventListener('click', setprevBgimage);
nextSlide.addEventListener('click', setnextBgimage);

settingsButton.addEventListener('click', () => {
  if(document.querySelector(".settings-container").style.display == "none"){
    document.querySelector(".settings-container").style.display = "block";
  } else {
    document.querySelector(".settings-container").style.display = "none";
  }
})

document.querySelector('#input1').addEventListener('change', () => {
  document.querySelector('#input1').checked == false ? time.style.display = "none" : time.style.display = "block"
});

document.querySelector('#input2').addEventListener('change', () => {
  document.querySelector('#input2').checked == false ? document.querySelector(".date").style.display = "none" : document.querySelector(".date").style.display = "block"
});

document.querySelector('#input3').addEventListener('change', () => {
  document.querySelector('#input3').checked == false ? (greeting.style.display = "none", name.style.display = "none") : (greeting.style.display = "block", name.style.display = "block")
});

document.querySelector('#input4').addEventListener('change', () => {
  document.querySelector('#input4').checked == false ? document.querySelector(".footer").style.display = "none" : document.querySelector(".footer").style.display = "block"
});

document.querySelector('#input5').addEventListener('change', () => {
  document.querySelector('#input5').checked == false ? document.querySelector(".weather").style.display = "none" : document.querySelector(".weather").style.display = "block"
});

document.querySelector('#input6').addEventListener('change', () => {
  document.querySelector('#input6').checked == false ? document.querySelector(".player-controls").style.display = "none" : document.querySelector(".player-controls").style.display = "block"
});

document.querySelector('#input7').addEventListener('change', () => {
  document.querySelector('#input7').checked == false ? document.querySelector(".lang").style.display = "none" : document.querySelector(".lang").style.display = "block"
});

document.querySelector('#input8').addEventListener('change', () => {
  document.querySelector('#input8').checked == false ? (prevSlide.addEventListener('click', setprevBgimage), nextSlide.addEventListener('click', setnextBgimage)) : (prevSlide.addEventListener('click', getLinkToImage), nextSlide.addEventListener('click', getLinkToImage))
});
//callFunctions
showTime();
showDate();
showGreeting();
inputName();
inputCity();
setWeather();
changeQuote();

 