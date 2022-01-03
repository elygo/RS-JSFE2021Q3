import { createElement } from './toys';
// left part - trees container ----------------------------------//
const selectTree = createElement('div', 'tree__select');
// settings - sound and snowflake
const snowflake = createElement('div', 'select__settings--snowflake');
snowflake.id = 'snowflake';

const sound = createElement('div', 'select__settings--sound off');
sound.id = 'sound';

const settings = createElement('div', 'select__settings');
settings.append(snowflake, sound);
// tree picker
const treePicker = createElement('div', 'select__tree-picker');
treePicker.id = 'tree-picker';
const treeItem = createElement('div', 'tree-item');
treeItem.id = 'tree-item';
treeItem.style.backgroundImage = "url('')";
treePicker.append(treeItem);
// background picker
const backgroundPicker = createElement('div', 'select__bg-picker');
backgroundPicker.id = 'bg-picker';
const bgItem = createElement('div', 'bg-item');
bgItem.id = 'bg-item';
bgItem.style.backgroundImage = "url('')";
backgroundPicker.append(bgItem);
// garland
const garland = createElement('div', 'select__garland');
garland.id = 'garland';

selectTree.append(settings, treePicker, backgroundPicker, garland);

// central part - area ---------------------------------------- //
const arena = createElement('div', 'tree__arena');
arena.id = 'arena';
// arena background
arena.style.backgroundImage = "url('../assets/bg/1.jpg')";
// arena tree
const treeImage = document.createElement('img');
treeImage.src = 'assets/tree/1.png';
treeImage.id = 'tree__arena--imagetree';
// arena map
treeImage.useMap = '#tree-image';
const map = document.createElement('map');
map.id = 'map';
map.name = 'tree-image';
//map area
const area = document.createElement('area');
area.coords = '35,478,3,638,132,709,390,701,481,649,496,583,451,451,375,245,316,100,251,0,179,113,112,268,74,373';
area.shape = 'poly';
area.id = 'area';
map.appendChild(area);
//garland container
const garlandContainer = createElement('div', 'garland-container');
garlandContainer.id = 'garland-container';
arena.append(garlandContainer, map, treeImage);
// right part - toys container --------------------------------- //
const selectToys = createElement('div', 'tree__toys');
// selected toys
const dragToysContainer = createElement('div', 'drag-toys-container');
dragToysContainer.id = 'drag-toys-container';

const dragToysItem = createElement('div', 'drag-toys-item');
dragToysItem.id = 'drag-toys-item';
dragToysContainer.append(dragToysItem);
// used trees
const usedTreesContainer = createElement('div', 'used-trees-container');
usedTreesContainer.id = 'used-trees';
selectToys.append(dragToysContainer, usedTreesContainer);

// ------------------- tree page main container -----------------//
const sectionsTree = createElement('section', 'tree');
sectionsTree.append(selectTree, arena, selectToys);
import { pageTree } from '../utils/drag';
const TreePage = {
    render: async (): Promise<string> => {
        return sectionsTree.outerHTML;
    },
    after_render: async (): Promise<void> => {
        pageTree();
    },
};

export default TreePage;
