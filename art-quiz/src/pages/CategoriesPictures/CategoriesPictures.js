import CategoriesPicturesElement from './CategoriesPictures.html';

import { images } from '@/data/images';

const splitArr = (arr, chunks) =>[
  ...Array(chunks),
].map((_, c) => arr.filter((n, index) => index % chunks === c));

const questionsByAuthor = [];
const questionsByName = [];

images.forEach((item, index) => {
  if (index % 2 === 0) {
    questionsByAuthor.push({
      ...item,
      type: 'author',
    });
  }

  if (index % 2 !== 0) {
    questionsByName.push({
      ...item,
      type: 'name',
    });
  }
});

const uniqAnswersByAuthor = [...new Set(questionsByAuthor.map(item => item.author))];
const uniqAnswersByName = [...new Set(questionsByName.map(item => item.author))];

const newQuestionsByAuthor = splitArr(questionsByAuthor, 12);
const newQuestionsByName = splitArr(questionsByName, 12);

const answers = {
  uniqAnswersByAuthor,
  uniqAnswersByName,
}

const questions = {
  questionsByAuthor: newQuestionsByAuthor,
  questionsByName: newQuestionsByName,
};

const pageCategories = questions['questionsByName'];
const categoriesToRender = pageCategories.map(pageCategory => {
  return pageCategory[0].author;
});


let newSection = document.createElement("section");
newSection.innerHTML = CategoriesPicturesElement;
//append 12 categories with inner elements
newSection.querySelector(".categories__content").innerHTML = `<div class="categories__content-flex"></div>`;

for(let i=13; i <= 24; i++ ) {  
  newSection.querySelector('.categories__content-flex').innerHTML += `<div class="categories__content-flex-box">
                                                                  <div class="categories__content-flex-box-header">
                                                                      <span class="categories__content-flex-box-title">Round${i}</span>
                                                                      <span class="categories__content-flex-box-score"></span>
                                                                  </div>                
                                                                      <div class="categories__content-flex-box-image" onclick="location.href='/#/round'">
                                                                        <img src="../../data/img/${
                                                                          10 * i
                                                                        }.jpg" alt="">
                                                                      </div>
                                                              </div>`;

  
                                                              
}

//render according to pathname 

function onRouteChanged() {
}

window.addEventListener("hashchange", onRouteChanged);
//add questions to each category

// newSection.querySelector(".categories__content").append(categoriesToRender[0]);
// console.log(newSection);

export class CategoriesPictures {
  constructor() {};

  async render () {
    return newSection.innerHTML;
  }

  async after_render () {};
}
