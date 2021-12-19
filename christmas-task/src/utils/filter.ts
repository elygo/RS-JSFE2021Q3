import data from '../data';

import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
interface Ifilter {
    num: string[];
    name: string[];
    count: string[];
    year: string[];
    shape: string[];
    color: string[];
    size: string[];
    favorite: boolean[];
}

interface Idata {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: boolean;
}

export function Filter() {
    const itemTitle = document.getElementById('itemTitle') as HTMLElement;
    const itemImg = document.getElementById('itemImg') as HTMLImageElement;
    const itemQuantity = document.getElementById('itemQuantity') as HTMLElement;
    const itemYear = document.getElementById('itemYear') as HTMLElement;
    const itemShape = document.getElementById('itemShape') as HTMLElement;
    const itemColor = document.getElementById('itemColor') as HTMLElement;
    const itemSize = document.getElementById('itemSize') as HTMLElement;
    const itemFavorite = document.getElementById('itemFavorite') as HTMLElement;
    const itemRibbon = document.getElementById('itemRibbon') as HTMLElement;
    const itemDescription = document.getElementById('itemDescription') as HTMLElement;
    const divItem = document.getElementById('divItem') as HTMLElement;
    const divItems = document.getElementById('divItems') as HTMLElement;

    const divExampleSlider = document.getElementById('exampleSlider') as HTMLElement;
    noUiSlider.create(divExampleSlider, {
        start: [0, 100],
        connect: true,
        range: {
            min: 0,
            max: 100,
        },
    });

    const divYearSlider = document.getElementById('yearSlider') as HTMLElement;
    noUiSlider.create(divYearSlider, {
        start: [0, 100],
        connect: true,
        range: {
            min: 0,
            max: 100,
        },
    });

    function filterInner(items: Idata[]) {
        divItems.innerHTML = '';
        items.forEach((elem) => {
            itemTitle.innerHTML = elem.name;
            itemImg.src = 'assets/toys/' + elem.num + '.png';
            itemQuantity.innerHTML = 'Количество: ' + elem.count;
            itemYear.innerHTML = 'Год покупки: ' + elem.year;
            itemShape.innerHTML = 'Форма: ' + elem.shape;
            itemColor.innerHTML = 'Цвет: ' + elem.color;
            itemSize.innerHTML = 'Размер: ' + elem.size;
            itemFavorite.innerHTML = 'Любимая: ' + (elem.favorite ? 'да' : 'нет');
            itemDescription.append(itemQuantity, itemYear, itemShape, itemColor, itemSize, itemFavorite, itemRibbon);
            divItem.append(itemDescription);
            divItems.innerHTML += divItem.outerHTML;
        });
    }
    filterInner(data);

    const filter: Ifilter = {
        num: [],
        name: [],
        count: [],
        year: [],
        shape: [],
        color: [],
        size: [],
        favorite: [],
    };

    const filterData = (res: Idata[], filterObject: any) => {
        const filterKeys = Object.keys(filterObject);
        const filteredData = res.filter((item: any) => {
            return filterKeys.every((key) => {
                if (!filterObject[key].length) {
                    return true;
                }
                return filterObject[key].includes(item[key]);
            });
        });
        return filteredData;
    };

    function appendShapeFilter(id: string, value: string) {
        let clicks = 0;
        const filtrableElement = document.getElementById(id) as HTMLElement;
        filtrableElement.addEventListener('click', () => {
            if (clicks % 2 == 0) {
                filtrableElement.style.filter =
                    'invert(51%) sepia(13%) saturate(45%) hue-rotate(349deg) brightness(101%) contrast(147%)';
                filter.shape.push(value);
            } else {
                filtrableElement.style.filter = '';
                const index = filter.shape.indexOf(value);
                if (index > -1) {
                    filter.shape.splice(index, 1);
                }
            }
            filterInner(filterData(data, filter));
            ++clicks;
        });
    }

    appendShapeFilter('sphere', 'шар');
    appendShapeFilter('bell', 'колокольчик');
    appendShapeFilter('cone', 'шишка');
    appendShapeFilter('snowflake', 'снежинка');
    appendShapeFilter('toy', 'фигурка');

    function appendColorFilter(id: string, value: string) {
        let clicks = 0;
        const filtrableElement = document.getElementById(id) as HTMLElement;
        filtrableElement.addEventListener('click', () => {
            if (clicks % 2 == 0) {
                filtrableElement.className = 'active';
                filter.color.push(value);
            } else {
                filtrableElement.className = '';
                const index = filter.color.indexOf(value);
                if (index > -1) {
                    filter.color.splice(index, 1);
                }
            }
            filterInner(filterData(data, filter));
            ++clicks;
        });
    }

    appendColorFilter('white', 'белый');
    appendColorFilter('yellow', 'желтый');
    appendColorFilter('red', 'красный');
    appendColorFilter('blue', 'синий');
    appendColorFilter('green', 'зелёный');

    function appendSizeFilter(id: string, value: string) {
        let clicks = 0;
        const filtrableElement = document.getElementById(id) as HTMLElement;
        filtrableElement.addEventListener('click', () => {
            if (clicks % 2 == 0) {
                filtrableElement.style.filter =
                    'invert(51%) sepia(13%) saturate(45%) hue-rotate(349deg) brightness(101%) contrast(147%)';
                filter.size.push(value);
            } else {
                filtrableElement.style.filter = '';
                const index = filter.size.indexOf(value);
                if (index > -1) {
                    filter.size.splice(index, 1);
                }
            }
            filterInner(filterData(data, filter));
            ++clicks;
        });
    }

    appendSizeFilter('big', 'большой');
    appendSizeFilter('medium', 'средний');
    appendSizeFilter('small', 'малый');

    function appendFavoriteFilter(id: string) {
        let clicks = 0;
        const filtrableElement = document.getElementById(id) as HTMLInputElement;
        filtrableElement.addEventListener('click', () => {
            if (filtrableElement.checked && clicks % 2 == 0) {
                filter.favorite.push(true);
            } else {
                filter.favorite.pop();
                filtrableElement.checked = false;
            }
            ++clicks;
            filterInner(filterData(data, filter));
        });
    }
    appendFavoriteFilter('favorite');
}
