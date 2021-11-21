import CategoriesArtistsElement from './CategoriesArtists.html';

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

const pageCategories = questions['questionsByAuthor'];
const categoriesToRender = pageCategories.map(pageCategory => {
  return pageCategory[0].author;
});


let newSection = document.createElement("section");
newSection.innerHTML = CategoriesArtistsElement;
//append 12 categories with inner elementsfunction 
newSection.querySelector(".categories__content").innerHTML = `<div class="categories__content-flex"></div>`;
for(let i=1; i <= 12; i++ ) {  
  newSection.querySelector('.categories__content-flex').innerHTML += `<div class="categories__content-flex-box">
                                                                  <div class="categories__content-flex-box-header">
                                                                      <span class="categories__content-flex-box-title">Round${i}</span>
                                                                      <span class="categories__content-flex-box-score"></span>
                                                                  </div>                
                                                                      <div class="categories__content-flex-box-image" onclick="location.href='/#/round'; myfunc(); ">
                                                                        <img src="../../data/img/${10 * i}.jpg" alt="">
                                                                      </div>
                                                              </div>`;
}



export class CategoriesArtists {
  constructor() {
    this.category = 'artists';
  };
  

  async render () {
    return newSection.innerHTML;
  }

  async after_render () {};
}
