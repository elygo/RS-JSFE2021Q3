import data from '../data';

import * as noUiSlider from 'nouislider';
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
    let selectedCounter = 0;
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
        for (let i = 0; i < divItems.children.length; i++) {
            let selectedOddEven = 0;
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            divItems.children[i].addEventListener('click', function () {
                if (selectedCounter < 20) {
                    if (selectedOddEven % 2 == 0 && (divItems.children[i].className = 'toys__items-item selected')) {
                        divItems.children[i].className = 'toys__items-item selected';
                        ++selectedCounter;
                        (document.getElementById(
                            'item-counter'
                        ) as HTMLInputElement).innerHTML = selectedCounter.toString();
                    } else {
                        divItems.children[i].className = 'toys__items-item';
                        --selectedCounter;
                        (document.getElementById(
                            'item-counter'
                        ) as HTMLInputElement).innerHTML = selectedCounter.toString();
                    }
                } else if (divItems.children[i].className == 'toys__items-item selected') {
                    divItems.children[i].className = 'toys__items-item';
                    --selectedCounter;
                    (document.getElementById(
                        'item-counter'
                    ) as HTMLInputElement).innerHTML = selectedCounter.toString();
                } else {
                    alert('Извините, все слоты заполнены');
                }
                ++selectedOddEven;
            });
        }
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
                if (key == 'year') {
                    if (!filterObject[key].length) {
                        return true;
                    }
                    return (
                        Number(filterObject[key][0]) <= Number(item[key]) &&
                        Number(filterObject[key][1]) >= Number(item[key])
                    );
                } else if (key == 'count') {
                    if (!filterObject[key].length) {
                        return true;
                    }
                    return (
                        Number(filterObject[key][0]) <= Number(item[key]) &&
                        Number(filterObject[key][1]) >= Number(item[key])
                    );
                } else {
                    if (!filterObject[key].length) {
                        return true;
                    }
                    return filterObject[key].includes(item[key]);
                }
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

    //Favorite
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

    //Sort
    function sortDataNameAsc() {
        data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        filterInner(filterData(data, filter));
    }

    function sortDataNameDesc() {
        data.sort((a, b) => (a.name < b.name ? 1 : b.name < a.name ? -1 : 0));
        filterInner(filterData(data, filter));
    }

    function sortDataCountAsc() {
        data.sort((a, b) => Number(a.year) - Number(b.year));
        filterInner(filterData(data, filter));
    }

    function sortDataCountDesc() {
        data.sort((a, b) => Number(b.year) - Number(a.year));
        filterInner(filterData(data, filter));
    }

    const divSort = document.getElementById('divSelect') as HTMLSelectElement;
    divSort.addEventListener('change', function () {
        if (divSort.options[divSort.selectedIndex].value == 'sort-name-max') {
            sortDataNameAsc();
        } else if (divSort.options[divSort.selectedIndex].value == 'sort-name-min') {
            sortDataNameDesc();
        } else if (divSort.options[divSort.selectedIndex].value == 'sort-count-max') {
            sortDataCountAsc();
        } else if (divSort.options[divSort.selectedIndex].value == 'sort-count-min') {
            sortDataCountDesc();
        }
    });

    //Search
    const inputSearch = document.getElementById('navbar-search') as HTMLInputElement;
    inputSearch.addEventListener('keyup', () => {
        if (inputSearch.value == '') {
            filterInner(filterData(data, filter));
        } else if (inputSearch.value !== undefined || inputSearch.value !== null) {
            if (
                filterData(data, filter).every(
                    (x) => x.name.slice(0, inputSearch.value.length).toLocaleLowerCase() !== inputSearch.value
                )
            ) {
                alert('Извините, совпадений не обнаружено');
            } else {
                filterInner(
                    filterData(data, filter).filter((x) => x.name.toLocaleLowerCase().includes(inputSearch.value))
                );
            }
        }
    });

    //Reset
    (document.getElementById('reset') as HTMLElement).addEventListener('click', () => {
        Object.values(filter).filter((item) => {
            while (item.length) {
                item.pop();
            }
        });
        filterInner(filterData(data, filter));
    });

    const divExampleSlider = document.getElementById('exampleSlider') as noUiSlider.target;
    noUiSlider.create(divExampleSlider, {
        start: [0, 15],
        tooltips: true,
        connect: true,
        range: {
            min: 0,
            max: 15,
        },
        step: 1,
    });

    (divExampleSlider.noUiSlider as noUiSlider.API).on('update', function (values: (string | number)[]) {
        if (filter.count.length == 0) {
            filter.count.push(Math.floor(Number(values[0])).toString());
            filter.count.push(Math.floor(Number(values[1])).toString());
        } else {
            while (filter.count.length) {
                filter.count.pop();
            }
            filter.count.push(Math.floor(Number(values[0])).toString());
            filter.count.push(Math.floor(Number(values[1])).toString());
        }
        filterInner(filterData(data, filter));
    });

    const divYearSlider = document.getElementById('yearSlider') as noUiSlider.target;
    noUiSlider.create(divYearSlider, {
        start: [1940, 2020],
        tooltips: true,
        connect: true,
        range: {
            min: 1940,
            max: 2020,
        },
        step: 1,
    });

    (divYearSlider.noUiSlider as noUiSlider.API).on('update', function (values: (string | number)[]) {
        if (filter.year.length == 0) {
            filter.year.push(Math.floor(Number(values[0])).toString());
            filter.year.push(Math.floor(Number(values[1])).toString());
        } else {
            while (filter.year.length) {
                filter.year.pop();
            }
            filter.year.push(Math.floor(Number(values[0])).toString());
            filter.year.push(Math.floor(Number(values[1])).toString());
        }
        filterInner(filterData(data, filter));
    });

    //console
    console.log(
        '1. Вёрстка +10; \n2. Карточка содержит все элементы +10; \n3. Избранное +20;\n4. Сортировка +20; \n5. Фильтр в диапазоне +30;'
    );
    console.log(
        '6. Фильтры по значению +30; \n7. По фильтрам разоного типа +20; \n8. Сброс +10; \n9. Localstorage 0; \n10. Поиск +30; Общий балл: 180'
    );
}
