import data from '../data';
// ------ function for creating an element and assigning a classname ------ //
const createElement = (type: string, className: string): HTMLElement => {
    const element = document.createElement(type) as HTMLElement;
    element.className = className;
    return element;
};
// ------ function for creating an element and assigning a classname ------ //
const createButton = (buttonType: string, datafilter: string): HTMLElement => {
    const button = document.createElement(buttonType) as HTMLElement;
    button.setAttribute('data-filter', datafilter);
    return button;
};
//1. create section-Toys (includes 2 divs)
const sectionToys = createElement('section', 'toys');

// ------------------------- Filters ---------------------------//
//1.1 create div- toys__filter (includes 3 child divs)
const divFilter = createElement('div', 'toys__filter');
//1.1.1
const divValue = createElement('div', 'toys__filter-value');
const divValueTitle = createElement('div', 'toys__filter-title');
divValueTitle.innerHTML = 'Филтры по значению';

const shapeSphere = createButton('button', 'шар');
shapeSphere.id = 'sphere';

const shapeBell = createButton('button', 'колокольчик');
const shapeCone = createButton('button', 'шишка');
const shapeSnowflake = createButton('button', 'снежинка');
const shapeFigure = createButton('button', 'фигурка');

const divValueShape = createElement('div', 'toys__filter-value--shape');
const divValueShapeTitle = createElement('span', 'toys__filter-value-title');
divValueShapeTitle.innerHTML = 'Форма: ';
divValueShape.append(divValueShapeTitle, shapeSphere, shapeBell, shapeCone, shapeSnowflake, shapeFigure);

const divValueColor = createElement('div', 'toys__filter-value--color');
const divValueColorTitle = createElement('span', 'toys__filter-value-title');
divValueColorTitle.innerHTML = 'Цвет: ';
divValueColor.append(divValueColorTitle);

const divValueSize = createElement('div', 'toys__filter-value--size');
const divValueSizeTitle = createElement('span', 'toys__filter-value-title');
divValueSizeTitle.innerHTML = 'Размер: ';
divValueSize.append(divValueSizeTitle);

const divValueFavorite = createElement('div', 'toys__filter-value--favorite');
const divValueFavoriteTitle = createElement('span', 'toys__filter-value-title');
divValueFavoriteTitle.innerHTML = 'Только любимые: ';
divValueFavorite.append(divValueFavoriteTitle);

divValue.append(divValueTitle, divValueShape, divValueColor, divValueSize, divValueFavorite);
//1.1.2
const divRange = createElement('div', 'toys__filter-range');
const divRangeTitle = createElement('div', 'toys__filter-title');
divRangeTitle.innerHTML = 'Фильтры по диапазону';

divRange.append(divRangeTitle);
//1.1.3
const divSort = createElement('div', 'toys__filter-sort');
const divSortTitle = createElement('div', 'toys__filter-title');
divSortTitle.innerHTML = 'Сортировка';

divSort.append(divSortTitle);
// ------------------------ Toys --------------------- //
//1.2 create div- toys__items (includes 1 child div)
const divItems = createElement('div', 'toys__items');
//1.2.1 create div- toys__item
const divItem = createElement('div', 'toys__items-item');
const itemTitle = createElement('h2', 'item-title');
//1.2.2 create img- item-img
const itemImg = document.createElement('img');
itemImg.className = 'item-img';
//1.2.3 create div- item-description
const itemDescription = createElement('div', 'item-description');
//1.2.3.1
const itemQuantity = createElement('p', 'item-quantity');
//1.2.3.2
const itemYear = createElement('p', 'item-year');
//1.2.3.3
const itemShape = createElement('p', 'item-shape');
//1.2.3.4
const itemColor = createElement('p', 'item-color');
//1.2.3.5
const itemSize = createElement('p', 'item-size');
//1.2.3.6
const itemFavorite = createElement('p', 'item-favorite');
//1.2.4
const itemRibbon = createElement('p', 'item-ribbon');
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

divFilter.append(divValue, divRange, divSort);

sectionToys.append(divFilter, divItems);

export default sectionToys;
