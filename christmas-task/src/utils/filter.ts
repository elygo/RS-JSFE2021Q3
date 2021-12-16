//import data from '../data';

export function Filter() {
    // const itemTitle = document.getElementById('itemTitle') as HTMLElement;
    // const itemImg = document.getElementById('itemImg') as HTMLImageElement;
    // const itemQuantity = document.getElementById('itemQuantity') as HTMLElement;
    // const itemYear = document.getElementById('itemYear') as HTMLElement;
    // const itemShape = document.getElementById('itemShape') as HTMLElement;
    // const itemColor = document.getElementById('itemColor') as HTMLElement;
    // const itemSize = document.getElementById('itemShape') as HTMLElement;
    // const itemFavorite = document.getElementById('itemFavorite') as HTMLElement;
    // const itemRibbon = document.getElementById('itemRibbon') as HTMLElement;
    // const itemDescription = document.getElementById('itemDescription') as HTMLElement;
    // const divItem = document.getElementById('divItem') as HTMLElement;
    // const divItems = document.getElementById('divItems') as HTMLElement;
    // const sectionToys = document.getElementById('sectionToys') as HTMLElement;

    // const buildFilter = (filter: any) => {
    //     const query = {};
    //     for (const keys in filter) {
    //         if (filter[keys].constructor === Set && filter[keys].length > 0) {
    //             query[keys] = filter[keys];
    //         }
    //     }
    //     return query;
    // };
    // const filterData = (data, query: any) => {
    //     const filteredData = data.filter((item: any) => {
    //         for (const key in query) {
    //             if (item[key] === undefined || !query[key].includes(item[key])) {
    //                 return false;
    //             }
    //         }
    //         return true;
    //     });
    //     return filteredData;
    // };
    // const filter = {
    //     num: [],
    //     name: [],
    //     count: [],
    //     year: [],
    //     shape: [filterSphere],
    //     color: [],
    //     size: [],
    //     favorite: [],
    // };
    // const query = buildFilter(filter);
    // const result = filterData(data, query);

    (document.getElementById('sphere') as HTMLElement).addEventListener('click', () => {
        (document.getElementById('sphere') as HTMLElement).style.filter =
            'invert(51%) sepia(13%) saturate(45%) hue-rotate(349deg) brightness(101%) contrast(147%)';
        console.log('sphere');
    });

    // divItems.innerHTML = '';
    // data.forEach((elem) => {
    //     itemTitle.innerHTML = '';
    //     itemImg.src = 'assets/toys/' + elem.num + '.png';
    //     itemQuantity.innerHTML = 'Количество: ' + elem.count;
    //     itemYear.innerHTML = 'Год покупки: ' + elem.year;
    //     itemShape.innerHTML = 'Форма: ' + elem.shape;
    //     itemColor.innerHTML = 'Цвет: ' + elem.color;
    //     itemSize.innerHTML = 'Размер: ' + elem.size;
    //     itemFavorite.innerHTML = 'Любимая: ' + (elem.favorite ? 'да' : 'нет');
    //     itemDescription.append(itemQuantity, itemYear, itemShape, itemColor, itemSize, itemFavorite, itemRibbon);
    //     divItem.append(itemDescription);
    //     divItems.innerHTML += divItem.outerHTML;
    // });
    // sectionToys.append(divItems);
}
