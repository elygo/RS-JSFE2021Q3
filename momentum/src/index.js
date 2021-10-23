import "./owfont-regular.scss";
import "./style.scss";

const date = document.querySelector(".date"),
  time = document.querySelector(".time"),
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


//callFunctions
showTime();
showDate();
changeQuote();
