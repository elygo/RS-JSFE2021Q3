import { createButton } from '../pages/toys';
export function iterateGarland(): void {
    const mixedGarland = createButton('button', 'mixed-garland', 'mixed-garland');
    const redGarland = createButton('button', 'red-garland', 'red-garland');
    const blueGarland = createButton('button', 'blue-garland', 'blue-garland');
    const yellowGarland = createButton('button', 'yellow-garland', 'yellow-garland');
    const greenGarland = createButton('button', 'green-garland', 'green-garland');
    const garlandOff = createButton('button', 'garland-off', 'garland-off');
    (document.getElementById('garland') as HTMLElement).append(
        mixedGarland,
        redGarland,
        blueGarland,
        yellowGarland,
        greenGarland,
        garlandOff
    );

    (document.getElementById('garland') as HTMLElement).onclick = function (event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target.id == 'garland-off') {
            (document.getElementById('garland-container') as HTMLElement).innerHTML = '';
        }
        if (target.tagName == 'BUTTON' && target.id !== 'garland-off') {
            (document.getElementById('garland-container') as HTMLElement).innerHTML = '';
            for (let g = 1; g < 8; g++) {
                // rope
                const rope = document.createElement('ul');
                rope.className = 'rope';
                rope.style.width = ((g + 1) * 60).toString() + 'px';
                rope.style.height = ((g + 1) * 20).toString() + 'px';
                //lights
                const light = document.createElement('li');
                let l = 1;
                while (l <= 2 * g + 3) {
                    light.className = target.id;
                    switch (g) {
                        case 1:
                            light.style.transform =
                                'rotate(' +
                                (60 + (l - 1) * 15).toString() +
                                'deg) translate(' +
                                (60).toString() +
                                'px, 0px) rotate(-' +
                                (60 + (l - 1) * 15).toString() +
                                'deg)';
                            break;
                        case 2:
                            light.style.transform =
                                'rotate(' +
                                (55 + (l - 1) * 12).toString() +
                                'deg) translate(' +
                                (70).toString() +
                                'px) rotate(-' +
                                (55 + (l - 1) * 12).toString() +
                                'deg)';
                            break;
                        case 3:
                            light.style.transform =
                                'rotate(' +
                                (50 + (l - 1) * 10).toString() +
                                'deg) translate(' +
                                (80).toString() +
                                'px) rotate(-' +
                                (50 + (l - 1) * 10).toString() +
                                'deg)';
                            break;
                        case 4:
                            light.style.transform =
                                'rotate(' +
                                (55 + (l - 1) * 7).toString() +
                                'deg) translate(' +
                                (90).toString() +
                                'px) rotate(-' +
                                (55 + (l - 1) * 7).toString() +
                                'deg)';
                            break;
                        case 5:
                            light.style.transform =
                                'rotate(' +
                                (50 + (l - 1) * 6.5).toString() +
                                'deg) translate(' +
                                (100).toString() +
                                'px) rotate(-' +
                                (50 + (l - 1) * 6.5).toString() +
                                'deg)';
                            break;
                        case 6:
                            light.style.transform =
                                'rotate(' +
                                (50 + (l - 1) * 5.7).toString() +
                                'deg) translate(' +
                                (110).toString() +
                                'px) rotate(-' +
                                (50 + (l - 1) * 5.7).toString() +
                                'deg)';
                            break;
                        case 7:
                            light.style.transform =
                                'rotate(' +
                                (50 + (l - 1) * 5).toString() +
                                'deg) translate(' +
                                (115).toString() +
                                'px) rotate(-' +
                                (50 + (l - 1) * 5).toString() +
                                'deg)';
                            break;
                    }
                    rope.innerHTML += light.outerHTML;
                    l++;
                }
                (document.getElementById('garland-container') as HTMLElement).innerHTML += rope.outerHTML;
            }
        }
    };
}
