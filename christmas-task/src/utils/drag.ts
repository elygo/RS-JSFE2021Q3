import { snowflakeFall } from '../utils/snowflake';
import data from '../data';
interface ITreepage {
    snow: string[];
    music: string[];
    tree: string[];
    bg: string[];
}

if (localStorage.getItem('treepage') === null) {
    const treePageStorage: ITreepage = {
        snow: [],
        music: [],
        tree: [],
        bg: [],
    };

    localStorage.setItem('treepage', JSON.stringify(treePageStorage));
}

const treePageStorage: ITreepage = JSON.parse(localStorage.getItem('treepage') as string);

//functions
function iterateTrees(): void {
    const treeElem = document.getElementById('tree-item') as HTMLElement;
    (document.getElementById('tree-picker') as HTMLElement).innerHTML = '';
    for (let k = 1; k < 7; k++) {
        treeElem.style.backgroundImage = "url('../assets/tree/" + k + ".png')";
        (document.getElementById('tree-picker') as HTMLElement).innerHTML += treeElem.outerHTML;
    }

    if (JSON.parse(localStorage.getItem('treepage') as string).tree.length !== 0) {
        (document.getElementById('tree__arena--imagetree') as HTMLImageElement).src =
            '../assets/tree/' + JSON.parse(localStorage.getItem('treepage') as string).tree[0] + '.png';
    }

    (document.getElementById('tree-picker') as HTMLElement).onclick = function (event: MouseEvent) {
        const target = event.target as HTMLImageElement;
        if (target.style.backgroundImage) {
            treePageStorage.tree.pop();
            treePageStorage.tree.push(target.style.backgroundImage.slice(20, -6).replace(/"/g, '')); // change 20 to 19 before building
            localStorage.setItem('treepage', JSON.stringify(treePageStorage));
            (document.getElementById(
                'tree__arena--imagetree'
            ) as HTMLImageElement).src = target.style.backgroundImage.slice(4, -1).replace(/"/g, '');
        }
    };
}

function iterateBgs(): void {
    const bgElem = document.getElementById('bg-item') as HTMLElement;
    (document.getElementById('bg-picker') as HTMLElement).innerHTML = '';
    for (let k = 1; k <= 10; k++) {
        bgElem.style.backgroundImage = "url('../assets/bg/" + k + ".jpg')"; // remove ../ before building
        (document.getElementById('bg-picker') as HTMLElement).innerHTML += bgElem.outerHTML;
    }

    if (JSON.parse(localStorage.getItem('treepage') as string).bg.length !== 0) {
        (document.getElementById('arena') as HTMLElement).style.backgroundImage =
            "url('../assets/bg/" + JSON.parse(localStorage.getItem('treepage') as string).bg[0] + ".jpg')";
    }

    (document.getElementById('bg-picker') as HTMLElement).onclick = function (event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target.style.backgroundImage) {
            treePageStorage.bg.pop();
            treePageStorage.bg.push(target.style.backgroundImage.slice(18, -6).replace(/"/g, '')); // change 18 to 17 before building
            localStorage.setItem('treepage', JSON.stringify(treePageStorage));
            (document.getElementById('arena') as HTMLElement).style.backgroundImage = target.style.backgroundImage;
        }
    };
}

function draggableToys(): void {
    const dragToysElem = document.getElementById('drag-toys-item') as HTMLElement;
    const dragToysImg = document.createElement('img') as HTMLImageElement;
    const dragToysQuant = document.createElement('p') as HTMLElement;
    (document.getElementById('drag-toys-container') as HTMLElement).innerHTML = '';
    data.forEach((item) => {
        let d = 1;
        if (Number(item.num) <= 20) {
            dragToysElem.innerHTML = '';
            while (d <= Number(item.count)) {
                dragToysImg.src = 'assets/toys/' + item.num + '.png';
                dragToysImg.id = item.num + '-' + d.toString();
                dragToysImg.draggable = true;
                dragToysImg.width = 60;
                dragToysImg.height = 60;
                dragToysImg.style.position = 'absolute';
                dragToysImg.style.zIndex = '100';
                dragToysElem.innerHTML += dragToysImg.outerHTML;
                d++;
            }
            dragToysQuant.innerHTML = item.count;
            dragToysElem.append(dragToysQuant);
            (document.getElementById('drag-toys-container') as HTMLElement).innerHTML += dragToysElem.outerHTML;
        }
    });
}

function selectedToyDrag(): void {
    const dragToysElem = document.getElementById('drag-toys-item') as HTMLElement;
    dragToysElem.draggable = true;
    const dragToysImg = document.createElement('img') as HTMLImageElement;
    const dragToysQuant = document.createElement('p') as HTMLElement;
    (document.getElementById('drag-toys-container') as HTMLElement).innerHTML = '';
    data.forEach((item) => {
        let d = 1;
        if (JSON.parse(localStorage.getItem('select') as string).selected.includes(item.name)) {
            dragToysElem.innerHTML = '';
            while (d <= Number(item.count)) {
                dragToysImg.src = 'assets/toys/' + item.num + '.png';
                dragToysImg.id = item.num + '-' + d.toString();
                dragToysImg.draggable = true;
                dragToysImg.width = 60;
                dragToysImg.height = 60;
                dragToysImg.style.position = 'absolute';
                dragToysImg.style.zIndex = '100';
                dragToysElem.innerHTML += dragToysImg.outerHTML;
                d++;
            }
            dragToysQuant.innerHTML = item.count;
            dragToysElem.append(dragToysQuant);
            (document.getElementById('drag-toys-container') as HTMLElement).innerHTML += dragToysElem.outerHTML;
        }
    });
}

import { iterateGarland } from './garland';

export function pageTree() {
    // ------------------------ localstorage ------------------------//
    if (localStorage.getItem('treepage') === null) {
        const treepage: ITreepage = {
            snow: [],
            music: [],
            tree: [],
            bg: [],
        };

        localStorage.setItem('treepage', JSON.stringify(treepage));
    }
    const treepage: ITreepage = JSON.parse(localStorage.getItem('treepage') as string);
    if ((document.getElementById('item-counter') as HTMLInputElement) && localStorage.getItem('select') !== null) {
        (document.getElementById('item-counter') as HTMLInputElement).innerHTML = JSON.parse(
            localStorage.getItem('select') as string
        ).selected.length.toString();
    }
    // sound
    const audio = new Audio('../assets/audio/audio.mp3');
    (document.getElementById('sound') as HTMLElement).addEventListener('click', () => {
        if (
            (document.getElementById('sound') as HTMLElement).classList.contains('off') &&
            JSON.parse(localStorage.getItem('treepage') as string).music.indexOf('on') == -1
        ) {
            (document.getElementById('sound') as HTMLElement).classList.remove('off');
            treepage.music.push('on');
            localStorage.setItem('treepage', JSON.stringify(treepage));
            audio.play();
        } else {
            (document.getElementById('sound') as HTMLElement).classList.add('off');
            treepage.music.pop();
            localStorage.setItem('treepage', JSON.stringify(treepage));
            audio.pause();
            // audio.currentTime = 0;
        }
    });
    // snowflake
    (document.getElementById('snowflake') as HTMLElement).addEventListener('click', () => {
        setInterval(snowflakeFall, 50);
        if (
            (document.getElementById('snowflake') as HTMLElement).classList.contains('off') &&
            JSON.parse(localStorage.getItem('treepage') as string).snow.indexOf('off') == -1
        ) {
            (document.getElementById('snowflake') as HTMLElement).classList.remove('off');
            treepage.snow.pop();
            treepage.snow.push('off');
            localStorage.setItem('treepage', JSON.stringify(treepage));
        } else {
            (document.getElementById('snowflake') as HTMLElement).classList.add('off');
            treepage.snow.pop();
            treepage.snow.push('on');
            localStorage.setItem('treepage', JSON.stringify(treepage));
        }
    });
    // launches immediately snowflakes and music
    document.body.onclick = function () {
        if (JSON.parse(localStorage.getItem('treepage') as string).music.indexOf('on') !== -1) {
            audio.play();
        }

        if (JSON.parse(localStorage.getItem('treepage') as string).snow.indexOf('on') !== -1) {
            setInterval(snowflakeFall, 50);
            (document.getElementById('snowflake') as HTMLElement).classList.add('off');
        }
    };

    iterateTrees();
    iterateBgs();
    iterateGarland();
    if (
        localStorage.getItem('select') === null ||
        JSON.parse(localStorage.getItem('select') as string).selected == ''
    ) {
        draggableToys();
    } else {
        selectedToyDrag();
    }

    const dragToysIterate = document.querySelectorAll('.drag-toys-item');

    for (let i = 0; i < dragToysIterate.length; i++) {
        (dragToysIterate[i] as HTMLImageElement).ondragstart = function drag(ev: DragEvent) {
            // send an element
            ev.dataTransfer?.setData('text/html', (ev.target as HTMLImageElement).id);
        };

        (dragToysIterate[i] as HTMLElement).ondragover = function allowDrop(ev) {
            ev.preventDefault();
        };

        (dragToysIterate[i] as HTMLElement).ondrop = function drop(ev) {
            ev.preventDefault();
            const data0 = ev.dataTransfer?.getData('text/html') as string;
            const evTarget = document.getElementById(data0) as HTMLImageElement;
            evTarget.style.left = '';
            evTarget.style.top = '';
            // count dragged in toys
            (dragToysIterate[i] as HTMLElement).getElementsByTagName('p')[0].innerHTML = (
                Number((dragToysIterate[i] as HTMLElement).getElementsByTagName('p')[0].innerHTML) + 1
            ).toString();
            (dragToysIterate[i] as HTMLElement)?.append(evTarget);
        };
    }

    (document.getElementById('area') as HTMLElement).ondragstart = function drag(ev: DragEvent) {
        // send an element
        ev.dataTransfer?.setData('text/html', (ev.target as HTMLImageElement).id);
    };

    (document.getElementById('area') as HTMLElement).ondragover = function allowDrop(ev) {
        ev.preventDefault();
    };

    (document.getElementById('area') as HTMLElement).ondrop = function drop(ev) {
        ev.preventDefault();
        const data1 = ev.dataTransfer?.getData('text/html') as string;
        const evTarget = document.getElementById(data1) as HTMLImageElement;
        evTarget.style.left = ev.clientX - evTarget.offsetWidth / 2 + 'px';
        evTarget.style.top = ev.clientY - evTarget.offsetHeight + 'px';

        // count dragged out from toys-div
        if ((evTarget.parentNode as HTMLElement).getElementsByTagName('p')[0] !== undefined) {
            (evTarget.parentNode as HTMLElement).getElementsByTagName('p')[0].innerHTML = (
                Number((evTarget.parentNode as HTMLElement).getElementsByTagName('p')[0].innerHTML) - 1
            ).toString();
            (ev.target as HTMLMapElement)?.append(evTarget);
        }
    };
}
