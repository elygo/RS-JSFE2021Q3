/* eslint-disable @typescript-eslint/no-non-null-assertion */
import './sources.css';
export interface Isource {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}
class Sources {
    public draw(data: Isource[]): void {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        let c: string, button: HTMLElement;
        if ((document.querySelector('.alphabet') as HTMLElement).innerHTML == '') {
            for (let i = 65; 90 >= i; i++) {
                c = String.fromCharCode(i);
                button = document.createElement('button') as HTMLElement;
                button.className = 'name';
                button.id = c;
                button.innerHTML = c;
                (document.querySelector('.alphabet') as HTMLElement).appendChild(button as HTMLElement);
            }
        }
        // (document.querySelector('.name') as HTMLElement).addEventListener('click', () => {
        //     console.log('aaa');
        // });
        //const res = document.querySelectorAll('.name');
        document.addEventListener('click', function (e: MouseEvent) {
            if ((e.target as Element).className == 'name') {
                (document.querySelector('.sources') as HTMLElement).innerHTML = '';
            }
            if ((e.target as Element).className == 'name') {
                data.forEach((item: Isource) => {
                    const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;
                    if (item.name.substring(0, 1).toLowerCase() === (e.target as Element).innerHTML.toLowerCase()) {
                        (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
                        (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute(
                            'data-source-id',
                            item.id
                        );
                        fragment.append(sourceClone);
                    }
                    (document.querySelector('.sources') as HTMLElement).append(fragment);
                });
            }
        });
    }
}

export default Sources;
