import data from '../data';

import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

interface IFilter {
    num: string[];
    name: string[];
    count: string[];
    year: string[];
    shape: string[];
    color: string[];
    size: string[];
    favorite: boolean[];
}

interface IData {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: boolean;
}

interface ISelect {
    [key: string]: string[];
}

export function Filter(): void {
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

    function filterInner(items: IData[]): void {
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

    if (localStorage.getItem('select') === null) {
        const selected: ISelect = {
            selected: [],
        };

        localStorage.setItem('select', JSON.stringify(selected));
    }
    const selected: ISelect = JSON.parse(localStorage.getItem('select') as string);

    let selectedCounter: number;
    if (JSON.parse(localStorage.getItem('select') as string).selected.length > 0) {
        selectedCounter = JSON.parse(localStorage.getItem('select') as string).selected.length;
        (document.getElementById('item-counter') as HTMLInputElement).innerHTML = JSON.parse(
            localStorage.getItem('select') as string
        ).selected.length.toString();
    } else {
        selectedCounter = 0;
    }

    divItems.onclick = function (event: MouseEvent) {
        const target = event.target as HTMLElement;
        const nameFavor = target.getElementsByTagName('h2')[0].innerHTML;
        let selectedOddEven = 0;
        if (selectedCounter < 20 && target.id == 'divItem') {
            if (
                selectedOddEven % 2 == 0 &&
                JSON.parse(localStorage.getItem('select') as string).selected.includes(nameFavor) !== true
            ) {
                selected.selected.push(target.getElementsByTagName('h2')[0].innerHTML);
                localStorage.setItem('select', JSON.stringify(selected));
                target.className = 'toys__items-item selected';
                ++selectedCounter;
                (document.getElementById('item-counter') as HTMLInputElement).innerHTML = selectedCounter.toString();
            } else {
                const selRemove = selected.selected.indexOf(target.getElementsByTagName('h2')[0].innerHTML);
                if (selRemove > -1) {
                    selected.selected.splice(selRemove, 1);
                    localStorage.setItem('select', JSON.stringify(selected));
                    target.className = 'toys__items-item';
                }
                --selectedCounter;
                (document.getElementById('item-counter') as HTMLInputElement).innerHTML = selectedCounter.toString();
            }
        } else if (target.className == 'toys__items-item selected') {
            target.className = 'toys__items-item';
            --selectedCounter;
            (document.getElementById('item-counter') as HTMLInputElement).innerHTML = selectedCounter.toString();
        }
        ++selectedOddEven;
    };

    if (localStorage.getItem('filter') === null) {
        const filt: IFilter = {
            num: [],
            name: [],
            count: [],
            year: [],
            shape: [],
            color: [],
            size: [],
            favorite: [],
        };

        localStorage.setItem('filter', JSON.stringify(filt));
    }

    const filter: IFilter = JSON.parse(localStorage.getItem('filter') as string);
    const filterData = (res: IData[], filterObject: IFilter) => {
        const filterKeys = Object.keys(filterObject) as Array<keyof typeof filterObject>;
        const filteredData = res.filter((item: IData) => {
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
                    return filterObject[key].includes(item[key] as never);
                }
            });
        });
        return filteredData;
    };

    function appendShapeFilter(id: string, value: string): void {
        let clicks = 0;
        const filtrableElement = document.getElementById(id) as HTMLElement;
        filtrableElement.addEventListener('click', () => {
            if (clicks % 2 == 0 && JSON.parse(localStorage.getItem('filter') as string).shape.indexOf(value) == -1) {
                filtrableElement.style.filter =
                    'invert(51%) sepia(13%) saturate(45%) hue-rotate(349deg) brightness(101%) contrast(147%)';
                filter.shape.push(value);
                localStorage.setItem('filter', JSON.stringify(filter));
            } else {
                filtrableElement.style.filter = '';
                const index = filter.shape.indexOf(value);
                if (index > -1) {
                    filter.shape.splice(index, 1);
                    localStorage.setItem('filter', JSON.stringify(filter));
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

    function appendColorFilter(id: string, value: string): void {
        let clicks = 0;
        const filtrableElement = document.getElementById(id) as HTMLElement;
        filtrableElement.addEventListener('click', () => {
            if (clicks % 2 == 0 && JSON.parse(localStorage.getItem('filter') as string).color.indexOf(value) == -1) {
                filtrableElement.className = 'active';
                filter.color.push(value);
                localStorage.setItem('filter', JSON.stringify(filter));
            } else {
                filtrableElement.className = '';
                const index = filter.color.indexOf(value);
                if (index > -1) {
                    filter.color.splice(index, 1);
                    localStorage.setItem('filter', JSON.stringify(filter));
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

    function appendSizeFilter(id: string, value: string): void {
        let clicks = 0;
        const filtrableElement = document.getElementById(id) as HTMLElement;
        filtrableElement.addEventListener('click', () => {
            if (clicks % 2 == 0 && JSON.parse(localStorage.getItem('filter') as string).size.indexOf(value) == -1) {
                filtrableElement.style.filter =
                    'invert(51%) sepia(13%) saturate(45%) hue-rotate(349deg) brightness(101%) contrast(147%)';
                filter.size.push(value);
                localStorage.setItem('filter', JSON.stringify(filter));
            } else {
                filtrableElement.style.filter = '';
                const index = filter.size.indexOf(value);
                if (index > -1) {
                    filter.size.splice(index, 1);
                    localStorage.setItem('filter', JSON.stringify(filter));
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
    function appendFavoriteFilter(id: string): void {
        let clicks = 0;
        const filtrableElement = document.getElementById(id) as HTMLInputElement;
        filtrableElement.addEventListener('click', () => {
            if (
                filtrableElement.checked &&
                clicks % 2 == 0 &&
                JSON.parse(localStorage.getItem('filter') as string).favorite.indexOf(true) == -1
            ) {
                filter.favorite.push(true);
                localStorage.setItem('filter', JSON.stringify(filter));
            } else {
                filter.favorite.pop();
                filtrableElement.checked = false;
                localStorage.setItem('filter', JSON.stringify(filter));
            }
            ++clicks;
            filterInner(filterData(data, filter));
        });
    }
    appendFavoriteFilter('favorite');

    //Sort
    function sortDataNameAsc(): void {
        data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        filterInner(filterData(data, filter));
    }

    function sortDataNameDesc(): void {
        data.sort((a, b) => (a.name < b.name ? 1 : b.name < a.name ? -1 : 0));
        filterInner(filterData(data, filter));
    }

    function sortDataCountAsc(): void {
        data.sort((a, b) => Number(a.year) - Number(b.year));
        filterInner(filterData(data, filter));
    }

    function sortDataCountDesc(): void {
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
                filterData(data, filter).every((x) =>
                    x.name.toLocaleLowerCase().includes(inputSearch.value.toLocaleLowerCase())
                )
            ) {
                alert('Извините, совпадений не обнаружено');
            } else {
                filterInner(
                    filterData(data, filter).filter((x) =>
                        x.name.toLocaleLowerCase().includes(inputSearch.value.toLocaleLowerCase())
                    )
                );
            }
        }
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
        format: {
            from: function (value) {
                return parseInt(value.toString());
            },
            to: function (value) {
                return parseInt(value.toString());
            },
        },
    });

    (divExampleSlider.noUiSlider as noUiSlider.API).on('update', function (values: (string | number)[]) {
        if (
            (filter.count.length == 0 &&
                JSON.parse(localStorage.getItem('filter') as string).count.indexOf(values[0]) == -1) ||
            (filter.count.length == 0 &&
                JSON.parse(localStorage.getItem('filter') as string).count.indexOf(values[1]) == -1)
        ) {
            filter.count.push(Math.floor(Number(values[0])).toString());
            filter.count.push(Math.floor(Number(values[1])).toString());
            localStorage.setItem('filter', JSON.stringify(filter));
        } else {
            while (filter.count.length) {
                filter.count.pop();
            }
            filter.count.push(Math.floor(Number(values[0])).toString());
            filter.count.push(Math.floor(Number(values[1])).toString());
            localStorage.setItem('filter', JSON.stringify(filter));
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
        format: {
            from: function (value) {
                return parseInt(value.toString());
            },
            to: function (value) {
                return parseInt(value.toString());
            },
        },
    });

    (divYearSlider.noUiSlider as noUiSlider.API).on('update', function (values: (string | number)[]) {
        if (
            (filter.year.length == 0 &&
                JSON.parse(localStorage.getItem('filter') as string).year.indexOf(values[0]) == -1) ||
            (filter.year.length == 0 &&
                JSON.parse(localStorage.getItem('filter') as string).year.indexOf(values[1]) == -1)
        ) {
            filter.year.push(Math.floor(Number(values[0])).toString());
            filter.year.push(Math.floor(Number(values[1])).toString());
            localStorage.setItem('filter', JSON.stringify(filter));
        } else {
            while (filter.year.length) {
                filter.year.pop();
            }
            filter.year.push(Math.floor(Number(values[0])).toString());
            filter.year.push(Math.floor(Number(values[1])).toString());
            localStorage.setItem('filter', JSON.stringify(filter));
        }
        filterInner(filterData(data, filter));
    });

    //Reset
    (document.getElementById('reset') as HTMLElement).addEventListener('click', () => {
        for (let i = 0; i < document.querySelectorAll('button').length; i++) {
            document.querySelectorAll('button')[i].style.filter = '';
        }

        (document.getElementById('white') as HTMLInputElement).className = '';
        (document.getElementById('yellow') as HTMLInputElement).className = '';
        (document.getElementById('red') as HTMLInputElement).className = '';
        (document.getElementById('blue') as HTMLInputElement).className = '';
        (document.getElementById('green') as HTMLInputElement).className = '';

        (document.querySelector('.favorite') as HTMLInputElement).checked = false;

        (divYearSlider.noUiSlider as noUiSlider.API).updateOptions(
            {
                start: [1940, 2020],
                range: {
                    min: 1940,
                    max: 2020,
                },
            },
            false
        );

        (divExampleSlider.noUiSlider as noUiSlider.API).updateOptions(
            {
                start: [0, 15],
                range: {
                    min: 0,
                    max: 15,
                },
            },
            false
        );

        Object.values(filter).filter((item) => {
            while (item.length) {
                item.pop();
            }
        });
        filterInner(filterData(data, filter));
    });
}
