import { createElement } from './toys';
// left part - trees container ----------------------------------//
const selectTree = createElement('div', 'tree__select');
// settings - sound and snowflake
const snowflake = createElement('div', 'select__settings--snowflake');
snowflake.id = 'snowflake';
const settings = createElement('div', 'select__settings');
settings.append(snowflake);
// tree picker
const treePicker = createElement('div', 'select__tree-picker');
treePicker.innerHTML = 'treepicker';
// background picker
const backgroundPicker = createElement('div', 'select__bg-picker');
const bgItem = createElement('div', 'bg-item');
bgItem.style.backgroundImage = "url('../assets/bg/1.jpg')";
backgroundPicker.append(bgItem);
// garland
const garland = createElement('div', 'select__garland');
garland.innerHTML = 'garland';

selectTree.append(settings, treePicker, backgroundPicker, garland);

// central part - area ---------------------------------------- //
const arena = createElement('div', 'tree__arena');
arena.id = 'arena';

// right part - toys container --------------------------------- //
const selectToys = createElement('div', 'tree__toys');
// selected toys
const selectedToys = createElement('div', 'final__toys');
// used trees
const usedTrees = createElement('div', 'final__trees');
selectToys.append(selectedToys, usedTrees);

//functions
function snowflakeFall() {
    if ((document.getElementById('snowflake') as HTMLElement).classList.contains('off')) {
        const snowflakeUnit = document.createElement('i') as HTMLElement;
        snowflakeUnit.innerHTML = '*';
        snowflakeUnit.classList.add('fas');
        snowflakeUnit.classList.add('fa-snowflake');
        snowflakeUnit.style.left = Math.random() * window.innerWidth + 'px';
        snowflakeUnit.style.animationDuration = Math.random() * 4 + 2 + 's'; // between 2 - 5 seconds
        snowflakeUnit.style.opacity = Math.random().toString();
        snowflakeUnit.style.fontSize = Math.random() * 15 + 10 + 'px';

        document.body.appendChild(snowflakeUnit);

        setTimeout(() => {
            snowflakeUnit.remove();
        }, 5000);
    }
}

// ------------------- tree page main container -----------------//
const sectionsTree = createElement('section', 'tree');
sectionsTree.append(selectTree, arena, selectToys);

const TreePage = {
    render: async (): Promise<string> => {
        return sectionsTree.outerHTML;
    },
    after_render: async (): Promise<void> => {
        // sound

        // snowflake
        (document.getElementById('snowflake') as HTMLElement).addEventListener('click', () => {
            if ((document.getElementById('snowflake') as HTMLElement).classList.contains('off')) {
                (document.getElementById('snowflake') as HTMLElement).classList.remove('off');
                setInterval(snowflakeFall, 50);
            } else {
                (document.getElementById('snowflake') as HTMLElement).classList.add('off');
            }
        });

        // iterate trees

        // iterate bgs

        // garland
    },
};

export default TreePage;
