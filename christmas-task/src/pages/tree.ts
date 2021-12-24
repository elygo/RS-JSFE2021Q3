import { createElement } from './toys';

// left part - trees container ----------------------------------//
const selectTree = createElement('div', 'tree__select');
// settings - sound and snowflake
const settings = createElement('div', 'select__settings');
settings.innerHTML = 'settings';
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
arena.innerHTML = 'Arena';

// right part - toys container --------------------------------- //
const selectToys = createElement('div', 'tree__toys');
// selected toys
const selectedToys = createElement('div', 'final__toys');
// used trees
const usedTrees = createElement('div', 'final__trees');
selectToys.append(selectedToys, usedTrees);

// ------------------- tree page main container -----------------//
const sectionsTree = createElement('section', 'tree');
sectionsTree.append(selectTree, arena, selectToys);

const TreePage = {
    render: async (): Promise<string> => {
        return sectionsTree.outerHTML;
    },
    after_render: async (): Promise<void> => {},
};

export default TreePage;
