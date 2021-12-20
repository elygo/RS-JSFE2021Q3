import { Filter } from '../utils/filter';

// ------ function for creating an element and assigning a classname ------ //
const createElement = (type: string, className: string): HTMLElement => {
    const element = document.createElement(type) as HTMLElement;
    element.className = className;
    return element;
};
// ------ function for creating an element and assigning a classname ------ //
const createButton = (buttonType: string, datafilter: string, id: string): HTMLElement => {
    const button = document.createElement(buttonType) as HTMLElement;
    button.setAttribute('data-filter', datafilter);
    button.id = id;
    return button;
};
//1. create section-Toys (includes 2 divs)
const sectionToys = createElement('section', 'toys');
sectionToys.id = 'sectionToys';
// ------------------------- Filters ---------------------------//
//1.1 create div- toys__filter (includes 3 child divs)
const divFilter = createElement('div', 'toys__filter');
divFilter.id = 'divFilter';
//1.1.1
const divValue = createElement('div', 'toys__filter-value');
const divValueTitle = createElement('div', 'toys__filter-title');
divValueTitle.innerHTML = 'Филтры по значению';

const shapeSphere = createButton('button', 'шар', 'sphere');
const shapeBell = createButton('button', 'колокольчик', 'bell');
const shapeCone = createButton('button', 'шишка', 'cone');
const shapeSnowflake = createButton('button', 'снежинка', 'snowflake');
const shapeToy = createButton('button', 'фигурка', 'toy');

const divValueShape = createElement('div', 'toys__filter-value--shape');
const divValueShapeTitle = createElement('span', 'toys__filter-value-title');
divValueShapeTitle.innerHTML = 'Форма: ';
divValueShape.append(divValueShapeTitle, shapeSphere, shapeBell, shapeCone, shapeSnowflake, shapeToy);

const colorWhite = createButton('button', 'белый', 'white');
const colorYellow = createButton('button', 'желтый', 'yellow');
const colorRed = createButton('button', 'красный', 'red');
const colorBlue = createButton('button', 'синий', 'blue');
const colorGreen = createButton('button', 'зелёный', 'green');
const divValueColor = createElement('div', 'toys__filter-value--color');
const divValueColorTitle = createElement('span', 'toys__filter-value-title');
divValueColorTitle.innerHTML = 'Цвет: ';
divValueColor.append(divValueColorTitle, colorWhite, colorYellow, colorRed, colorBlue, colorGreen);

const sizeBig = createButton('button', 'большой', 'big');
const sizeMedium = createButton('button', 'средний', 'medium');
const sizeSmall = createButton('button', 'малый', 'small');
const divValueSize = createElement('div', 'toys__filter-value--size');
const divValueSizeTitle = createElement('span', 'toys__filter-value-title');
divValueSizeTitle.innerHTML = 'Размер: ';
divValueSize.append(divValueSizeTitle, sizeBig, sizeMedium, sizeSmall);

const inputFavorite = document.createElement('input');
inputFavorite.id = 'favorite';
inputFavorite.className = 'favorite';
inputFavorite.setAttribute('type', 'checkbox');
const divValueFavorite = createElement('div', 'toys__filter-value--favorite');
const divValueFavoriteTitle = createElement('span', 'toys__filter-value-title');
divValueFavoriteTitle.innerHTML = 'Только любимые: ';
divValueFavorite.append(divValueFavoriteTitle, inputFavorite);

divValue.append(divValueTitle, divValueShape, divValueColor, divValueSize, divValueFavorite);
//1.1.2
const divRange = createElement('div', 'toys__filter-range');
const divRangeTitle = createElement('div', 'toys__filter-title');
divRangeTitle.innerHTML = 'Фильтры по диапазону';
//1.1.2.1
const spanExampleTitle = createElement('span', 'toys__filter-range--slidertitle');
spanExampleTitle.innerHTML = 'Количество экземпляров: ';
const divFirstSlider = createElement('div', 'toys__filter-range--firstslider');
const divExampleSlider = createElement('div', 'toys__filter-range--exampleslider');
divExampleSlider.id = 'exampleSlider';
divFirstSlider.append(spanExampleTitle, divExampleSlider);
//1.1.2.2
const spanYearTitle = createElement('span', 'toys__filter-range--slidertitle');
spanYearTitle.innerHTML = 'Год приобретения: ';
const divSecondSlider = createElement('div', 'toys__filter-range--secondtslider');
const divYearSlider = createElement('div', 'toys__filter-range--yearslider');
divYearSlider.id = 'yearSlider';
divSecondSlider.append(spanYearTitle, divYearSlider);

divRange.append(divRangeTitle, divFirstSlider, divSecondSlider);
//1.1.3
const divSort = createElement('div', 'toys__filter-sort');
const divSortTitle = createElement('div', 'toys__filter-title');
divSortTitle.innerHTML = 'Сортировка';

const divOptionNameMax = document.createElement('option');
divOptionNameMax.value = 'sort-name-max';
divOptionNameMax.innerHTML = 'По названию от «А» до «Я»';

const divOptionNameMin = document.createElement('option');
divOptionNameMin.value = 'sort-name-min';
divOptionNameMin.innerHTML = 'По названию от «Я» до «А»';

const divOptionCountMax = document.createElement('option');
divOptionCountMax.value = 'sort-count-max';
divOptionCountMax.innerHTML = 'По количеству по возрастанию';

const divOptionCountMin = document.createElement('option');
divOptionCountMin.value = 'sort-count-min';
divOptionCountMin.innerHTML = 'По количеству по убыванию';

const divSelect = createElement('select', 'toys__filter-sort--select');
divSelect.id = 'divSelect';
divSelect.append(divOptionNameMax, divOptionNameMin, divOptionCountMax, divOptionCountMin);

const buttonReset = document.createElement('button') as HTMLElement;
buttonReset.className = 'reset';
buttonReset.id = 'reset';
buttonReset.innerHTML = 'Сброс фильтров';

divSort.append(divSortTitle, divSelect, buttonReset);
// ------------------------ Toys --------------------- //
//1.2 create div- toys__items (includes 1 child div)
const divItems = createElement('div', 'toys__items');
divItems.id = 'divItems';
//1.2.1 create div- toys__item
const divItem = createElement('div', 'toys__items-item');
divItem.id = 'divItem';
const itemTitle = createElement('h2', 'item-title');
itemTitle.id = 'itemTitle';
//1.2.2 create img- item-img
const itemImg = document.createElement('img');
itemImg.className = 'item-img';
itemImg.id = 'itemImg';
//1.2.3 create div- item-description
const itemDescription = createElement('div', 'item-description');
itemDescription.id = 'itemDescription';
//1.2.3.1
const itemQuantity = createElement('p', 'item-quantity');
itemQuantity.id = 'itemQuantity';
//1.2.3.2
const itemYear = createElement('p', 'item-year');
itemYear.id = 'itemYear';
//1.2.3.3
const itemShape = createElement('p', 'item-shape');
itemShape.id = 'itemShape';
//1.2.3.4
const itemColor = createElement('p', 'item-color');
itemColor.id = 'itemColor';
//1.2.3.5
const itemSize = createElement('p', 'item-size');
itemSize.id = 'itemSize';
//1.2.3.6
const itemFavorite = createElement('p', 'item-favorite');
itemFavorite.id = 'itemFavorite';
//1.2.4
const itemRibbon = createElement('p', 'item-ribbon');
itemRibbon.id = 'itemRibbon';
//appending childen
//iterate
itemDescription.append(itemQuantity, itemYear, itemShape, itemColor, itemSize, itemFavorite, itemRibbon);
divItem.append(itemTitle, itemImg, itemDescription);
divItems.appendChild(divItem);

divFilter.append(divValue, divRange, divSort);
itemDescription.append(itemQuantity, itemYear, itemShape, itemColor, itemSize, itemFavorite, itemRibbon);
divItem.append(itemDescription);

sectionToys.append(divFilter, divItems);

const ToysPage = {
    render: async () => {
        return sectionToys.outerHTML;
    },
    after_render: async () => {
        Filter();
    },
};

export default ToysPage;
