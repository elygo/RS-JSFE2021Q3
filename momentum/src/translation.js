import i18next from 'i18next';
import detector from "i18next-browser-languagedetector";
const button = document.querySelector(".lang");
button.value = localStorage.getItem('i18nextLng');

button.addEventListener("click", () => {   
    
    if(button.value == "en") {        
        button.value = "ru";
        i18next.changeLanguage('ru');
    } else {
        button.value = "en";
          i18next.changeLanguage('en');
    }    
    location.reload(true);
});


i18next.use(detector)
.init({
  lng: localStorage.getItem("i18nextLng"),
  debug: true,
  resources: {
    en: {
      translation: {
        Good: "Good",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night",
        windSpeed: "Wind speed",
        humidity: "Humidity"
      },
    },
    ru: {
      translation: {
        Good: "Добрый",
        morning: "утро",
        afternoon: "день",
        evening: "вечер",
        night: "ночь",
        windSpeed: "Скорость ветра",
        humidity: "Влажность"
      },
    },
  },
});

export default i18next;