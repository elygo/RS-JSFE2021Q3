import data from '../data';
//1. create section-Toys (includes 2 divs)
const sectionToys = document.createElement('section') as HTMLElement;
sectionToys.className = 'toys';

//1.1 create div- toys__filter (includes 3 child divs)
const divFilter = document.createElement('div') as HTMLElement;
divFilter.className = 'toys__filter';
//1.1.1
const divQuantity = document.createElement('div') as HTMLElement;
divQuantity.className = 'toys__filter-quantity';
//1.1.2
const divRange = document.createElement('div') as HTMLElement;
divRange.className = 'toys__filter-range';
//1.1.3
const divSort = document.createElement('div') as HTMLElement;
divSort.className = 'toys__filter-sort';

//1.2 create div- toys__items (includes 1 child div)
const divItems = document.createElement('div') as HTMLElement;
divItems.className = 'toys__items';
//1.2.1 create div- toys__item
const divItem = document.createElement('div') as HTMLElement;
divItem.className = 'toys__items-item';
const itemTitle = document.createElement('h2') as HTMLElement;
itemTitle.className = 'item-title';
//1.2.2 create img- item-img
const itemImg = document.createElement('img');
itemImg.className = 'item-img';
//1.2.3 create div- item-description
const itemDescription = document.createElement('div') as HTMLElement;
itemDescription.className = 'item-description';
//1.2.3.1
const itemQuantity = document.createElement('p') as HTMLElement;
itemQuantity.className = 'item-quantity';
//1.2.3.2
const itemYear = document.createElement('p') as HTMLElement;
itemYear.className = 'item-year';
//1.2.3.3
const itemShape = document.createElement('p') as HTMLElement;
itemShape.className = 'item-shape';
//1.2.3.4
const itemColor = document.createElement('p') as HTMLElement;
itemColor.className = 'item-color';
//1.2.3.5
const itemSize = document.createElement('p') as HTMLElement;
itemSize.className = 'item-size';
//1.2.3.6
const itemFavorite = document.createElement('p') as HTMLElement;
itemFavorite.className = 'item-favorite';
//1.2.4
const itemRibbon = document.createElement('div') as HTMLElement;
itemRibbon.className = 'item-ribbon';
//appending childen

//iterate
for (let i = 0; i < data.length; i++) {
    itemTitle.innerHTML = data[i].name;
    itemImg.src = 'assets/toys/' + data[i].num + '.png';
    itemQuantity.innerHTML = 'Количество: ' + data[i].count;
    itemYear.innerHTML = 'Год покупки: ' + data[i].year;
    itemShape.innerHTML = 'Форма: ' + data[i].shape;
    itemColor.innerHTML = 'Цвет: ' + data[i].color;
    itemSize.innerHTML = 'Размер: ' + data[i].size;
    itemFavorite.innerHTML = 'Любимая: ' + (data[i].favorite ? 'да' : 'нет');
    itemDescription.append(itemQuantity, itemYear, itemShape, itemColor, itemSize, itemFavorite, itemRibbon);
    divItem.append(itemTitle, itemImg, itemDescription);
    divItems.innerHTML += divItem.outerHTML;
}

divFilter.append(divQuantity, divRange, divSort);

sectionToys.append(divFilter, divItems);

const ToysPage = {
    render: async () => {
        return sectionToys.outerHTML;
        // return `
        // <section class="toys">
        //     <div class="toys__filter">
        //         <div class="toys__filter-quantity"></div>
        //         <div class="toys__filter-range"></div>
        //         <div class="toys__filter-sort"></div>
        //     </div>
        //     <div class="toys__items" id="toys__items">
        //         <div class="toys_item"></div>
        //     </div>
        // </section>`;
    },
    after_render: async () => {},
};

export default ToysPage;
