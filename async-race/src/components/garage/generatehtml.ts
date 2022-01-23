import { ICars } from './garage';
import Garage from './garage';
import Winners from '../winners/winners';
import GenerateTable from '../winners/generatetable';

export enum Status {
    start = 'started',
    stop = 'stopped',
    drive = 'drive',
}

const baseApi = 'http://127.0.0.1:3000/';
const carsLimitPerPage = 7;
class GenerateHtml {
    garage: Garage;
    winners: Winners;
    generatetable: GenerateTable;
    baseApi: string;
    carsLimitPerPage: number;
    constructor() {
        this.baseApi = baseApi;
        this.carsLimitPerPage = carsLimitPerPage;
        this.garage = new Garage();
        this.winners = new Winners();
        this.generatetable = new GenerateTable();
    }

    async garageContent() {
        const control = document.createElement('div');
        control.className = 'control-panel';
        const dynamicPart = document.createElement('div');
        dynamicPart.className = 'control-panel__dynamic';
        const counterPart = document.createElement('div');
        counterPart.className = 'control-panel__counter';
        control.append(dynamicPart, counterPart);

        const cars = document.createElement('div');
        cars.className = 'cars-list';
        cars.id = 'cars-list';

        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        const prevPage = document.createElement('button');
        prevPage.id = 'prev-page';
        prevPage.innerText = 'PREV';
        prevPage.disabled = true;
        const nextPage = document.createElement('button');
        nextPage.id = 'next-page';
        nextPage.innerText = 'NEXT';

        pagination.append(prevPage, nextPage);
        (document.querySelector('.garage-content') as HTMLElement).append(control, cars, pagination);
    }

    async showCars() {
        const data: ICars[] = (await JSON.parse(localStorage.getItem('data') as string)) || [];
        const carsList = document.getElementById('cars-list') as HTMLElement;

        const carName = document.createElement('div');
        const deleteCar = document.createElement('button');
        const selectCar = document.createElement('button');
        const startCar = document.createElement('button');
        const stopCar = document.createElement('button');

        const carImage = document.createElement('svg');
        const g = document.createElement('g');
        const path = document.createElement('path');
        path.setAttribute(
            'd',
            'm15.84993,14.03183c-3.79257,0 -6.86245,3.41748 -6.86245,7.63949c0,4.22201 3.06988,7.63949 6.86245,7.63949s6.86245,-3.41748 6.86245,-7.63949c0,-4.22201 -3.06988,-7.63949 -6.86245,-7.63949l0,0zm13.02777,-6.10162c0.37734,0.90421 0.67793,1.91521 0.90817,3.01165c0.52444,1.82978 -0.24943,2.21424 -2.04019,1.46667c-1.31749,-0.87573 -2.63497,-1.75858 -3.95246,-2.63431c-0.67153,-0.52686 -0.99131,-1.0466 -0.88259,-1.55922c0.21745,-1.011 1.96984,-1.53787 3.40884,-1.85113c1.82913,-0.40583 1.70122,-0.49126 2.55823,1.56634l0,0l-0.00001,0zm35.29715,10.18836c-1.75878,0 -3.19139,1.5877 -3.19139,3.55275c0,1.95793 1.42621,3.55275 3.19139,3.55275c1.75878,0 3.19139,-1.5877 3.19139,-3.55275c0,-1.96505 -1.42621,-3.55275 -3.19139,-3.55275l0,0zm-48.32492,0c-1.75878,0 -3.19139,1.5877 -3.19139,3.55275c0,1.95793 1.42621,3.55275 3.19139,3.55275c1.75878,0 3.19139,-1.5877 3.19139,-3.55275c0,-1.96505 -1.42621,-3.55275 -3.19139,-3.55275l0,0zm34.07559,-4.84855c-1.77157,-2.11457 -3.81816,-3.48868 -6.18451,-4.81295c-5.18041,-2.90486 -8.35261,-2.54887 -13.8528,-2.54887l1.84832,5.33981c0.77386,1.13916 1.65005,1.94369 2.98034,2.02201l15.20866,0l0,0l-0.00001,0zm14.24933,0.76181c-3.79257,0 -6.86245,3.41748 -6.86245,7.63949c0,4.22201 3.06988,7.63949 6.86245,7.63949s6.86245,-3.41748 6.86245,-7.63949c0,-4.22201 -3.06988,-7.63949 -6.86245,-7.63949l0,0zm-10.84688,-2.32816c-2.25124,-1.55922 -4.70074,-2.9547 -7.41246,-4.14369c-8.25668,-3.62395 -14.5691,-4.27185 -23.22871,-1.35275c-2.60939,1.10356 -5.21878,2.20712 -7.82818,2.89062c-2.57741,0.6835 -13.73768,1.33851 -14.01269,3.4246l2.75649,3.66667c-1.00411,0.96829 -1.82274,2.15728 -2.12333,4.01554c0.08314,1.14628 0.36455,2.10745 0.85061,2.87638c0.82503,1.31715 3.24255,2.67703 4.54725,1.90097c0.41571,-0.24919 0.65235,-0.74757 0.64595,-1.59482c-0.03837,-17.0162 18.41284,-15.07963 17.02501,2.00777l32.19529,0c-5.96067,-17.11587 19.46811,-17.17995 14.95284,-0.59094c1.5861,1.90809 5.32751,-0.96829 7.73864,-7.08415c-0.65874,-0.72621 -1.38144,-1.41683 -2.18729,-2.05761c0.03837,-0.0356 -0.03837,0.13528 0.09593,-0.12104c0.13431,-0.25631 -0.32618,-1.33139 -1.27272,-1.95081c-4.96296,-3.23949 -16.92907,-3.15405 -22.74264,-1.88673l0,0z'
        );
        g.append(path);
        carImage.append(g);

        const raceLine = document.createElement('div');
        const carBlock = document.createElement('div');

        carsList.innerHTML = '';
        data.forEach((element: ICars) => {
            startCar.innerText = 'Start';
            startCar.className = 'started';
            startCar.id = element.id.toString();

            stopCar.innerText = 'Stop';
            stopCar.disabled = true;
            stopCar.className = 'stopped';
            stopCar.id = element.id.toString();

            carName.innerHTML = element.name;
            carName.className = 'name';

            deleteCar.innerText = 'Delete';
            deleteCar.className = 'delete';
            deleteCar.id = element.id.toString();

            selectCar.innerText = 'Select';
            selectCar.className = 'select';
            selectCar.id = element.id.toString();

            carImage.className = 'car-image';
            carImage.id = 'car-image' + element.id.toString();
            carImage.style.height = '30px';
            carImage.style.width = '80px';
            path.style.stroke = '#000';
            path.style.width = '2px';
            g.setAttribute('fill', element.color);

            raceLine.className = 'race-line';
            raceLine.append(carImage);

            carBlock.className = 'car-block';
            carBlock.append(startCar, stopCar, carName, deleteCar, selectCar, raceLine);
            carsList.innerHTML += carBlock.outerHTML;
        });
    }

    async removeupdateCars() {
        const carsList = document.getElementById('cars-list') as HTMLElement;
        carsList.onclick = async (event: MouseEvent) => {
            const target = event.target as HTMLInputElement;
            const carNumFromStorage = await JSON.parse(localStorage.getItem('data') as string).length;
            if (target.className == 'delete') {
                await this.garage.deleteCar(this.baseApi, target.id);
                await this.winners.deleteWinner(this.baseApi, target.id);
                await this.garage.getCars(this.baseApi, localStorage.getItem('pagenum')?.toString());
                await this.showCars();

                if (carNumFromStorage < this.carsLimitPerPage) {
                    (document.getElementById('next-page') as HTMLInputElement).disabled = true;
                }
                (
                    document.querySelector('.control-panel__counter--cars') as HTMLElement
                ).innerText = `Garage (${await JSON.parse(localStorage.getItem('totalcars') as string)})`;
                await this.winners.getWinners(this.baseApi, localStorage.getItem('pagewinners')?.toString());
                await this.generatetable.showTable();
            }

            if (target.className == 'select') {
                const selectedCar: ICars[] = JSON.parse(localStorage.getItem('data') as string).filter(
                    (elem: ICars) => elem.id.toString() == target.id
                );
                const carNameUpdate = document.getElementById('name-updatecar-input') as HTMLInputElement;
                carNameUpdate.value = selectedCar[0].name;
                const carColorUpdate = document.getElementById('color-updatecar-input') as HTMLInputElement;
                carColorUpdate.value = selectedCar[0].color;
                const carUpdateButton = document.getElementById('update-car-button') as HTMLInputElement;

                carNameUpdate.disabled = false;
                carColorUpdate.disabled = false;
                carUpdateButton.disabled = false;

                carUpdateButton.onclick = async (e) => {
                    e.preventDefault();
                    await this.garage.updateCar(this.baseApi, target.id, carNameUpdate.value, carColorUpdate.value);
                    await this.garage.getCars(this.baseApi, localStorage.getItem('pagenum')?.toString());
                    await this.showCars();
                    await this.generatetable.showTable();

                    carNameUpdate.value = '';
                    carNameUpdate.disabled = true;
                    carColorUpdate.disabled = true;
                    carUpdateButton.disabled = true;
                };
            }

            const distance = (document.getElementsByClassName('race-line')[0] as HTMLElement).offsetWidth - 80;
            if (target.className == 'started') {
                if ((target.nextElementSibling as HTMLInputElement).id == target.id) {
                    (target.nextElementSibling as HTMLInputElement).disabled = false;
                    target.disabled = true;
                }
                const time: number = (await this.garage.startCar(this.baseApi, target.id, target.className)) || 5000;
                await this.animateOnStart('car-image' + target.id, time, distance);
                const engineStatus = await this.garage.driveCar(this.baseApi, target.id);
                if (!engineStatus) {
                    await this.animateOnDrive('car-image' + target.id);
                }
            }

            if (target.className == 'stopped') {
                if ((target.previousElementSibling as HTMLInputElement).id == target.id) {
                    (target.previousElementSibling as HTMLInputElement).disabled = false;
                    target.disabled = true;
                }
                await this.garage.stopCar(this.baseApi, target.id, target.className);
                await this.animateOnStop('car-image' + target.id);
            }
        };
    }

    async createCarBlock() {
        const nameCreateCar = document.createElement('input');
        nameCreateCar.type = 'text';
        nameCreateCar.name = 'name';
        nameCreateCar.id = 'name-car-input';

        const colorCreateCar = document.createElement('input');
        colorCreateCar.type = 'color';
        colorCreateCar.name = 'color';
        colorCreateCar.id = 'color-car-input';

        const buttonCreateCar = document.createElement('button');
        buttonCreateCar.innerText = 'Create';
        buttonCreateCar.id = 'create-car-button';

        const createCarBlock = document.createElement('div');
        createCarBlock.className = 'control-panel__dynamic--create-car';
        createCarBlock.append(nameCreateCar, colorCreateCar, buttonCreateCar);
        (document.querySelector('.control-panel__dynamic') as HTMLElement).appendChild(createCarBlock);

        buttonCreateCar.onclick = async (e) => {
            e.preventDefault();
            await this.garage.createCar(this.baseApi, nameCreateCar.value, colorCreateCar.value);
            await this.garage.getCars(this.baseApi, localStorage.getItem('pagenum')?.toString());
            await this.showCars();
            nameCreateCar.value = '';
            if ((await JSON.parse(localStorage.getItem('data') as string).length) == this.carsLimitPerPage) {
                (document.getElementById('next-page') as HTMLInputElement).disabled = false;
            }
            (
                document.querySelector('.control-panel__counter--cars') as HTMLElement
            ).innerText = `Garage (${await JSON.parse(localStorage.getItem('totalcars') as string)})`;
        };
    }

    async updateCarBlock() {
        const nameUpdateCar = document.createElement('input');
        nameUpdateCar.type = 'text';
        nameUpdateCar.name = 'name';
        nameUpdateCar.id = 'name-updatecar-input';
        nameUpdateCar.disabled = true;

        const colorUpdateCar = document.createElement('input');
        colorUpdateCar.type = 'color';
        colorUpdateCar.value = '#ffffff';
        colorUpdateCar.name = 'color';
        colorUpdateCar.id = 'color-updatecar-input';
        colorUpdateCar.disabled = true;

        const buttonUpdateCar = document.createElement('button');
        buttonUpdateCar.innerText = 'Update';
        buttonUpdateCar.id = 'update-car-button';
        buttonUpdateCar.disabled = true;

        const updateCarBlock = document.createElement('div');
        updateCarBlock.className = 'control-panel__dynamic--update-car';
        updateCarBlock.append(nameUpdateCar, colorUpdateCar, buttonUpdateCar);
        (document.querySelector('.control-panel__dynamic') as HTMLElement).appendChild(updateCarBlock);
    }

    async raceBlock() {
        const buttonRace = document.createElement('button');
        buttonRace.innerText = 'Race';
        buttonRace.id = 'race-button';
        (document.querySelector('.control-panel__dynamic') as HTMLElement).appendChild(buttonRace);

        buttonRace.onclick = async (e) => {
            e.preventDefault();
            buttonRace.disabled = true;
            (document.getElementById('reset-button') as HTMLInputElement).disabled = false;
            const distance: number = (document.getElementsByClassName('race-line')[0] as HTMLElement).offsetWidth - 80;
            const data: ICars[] = (await JSON.parse(localStorage.getItem('data') as string)) || [];
            document.querySelectorAll('.started').forEach((button) => ((button as HTMLInputElement).disabled = true));
            document.querySelectorAll('.stopped').forEach((button) => ((button as HTMLInputElement).disabled = false));
            let once = true;
            await Promise.all(
                data.map(async (drivecar) => {
                    const time: number =
                        (await this.garage.startCar(this.baseApi, drivecar.id.toString(), Status.start)) || 5000;
                    await this.animateOnStart('car-image' + drivecar.id, time, distance);
                    const engineStatus = await this.garage.driveCar(this.baseApi, drivecar.id.toString());
                    if (!engineStatus) {
                        await this.animateOnDrive('car-image' + drivecar.id.toString());
                    } else {
                        if (once) {
                            once = false;
                            const winnerTitle = document.createElement('div');
                            const winnerTime = Number((time / 1000).toFixed(2));
                            const wins = 1;
                            winnerTitle.className = 'winner-title';
                            winnerTitle.innerText = `${drivecar.name} (${winnerTime}s)`;
                            document.body.append(winnerTitle);
                            const winnerParams = await this.winners.getWinner(this.baseApi, drivecar.id);
                            if (!winnerParams) {
                                await this.winners.createWinner(this.baseApi, drivecar.id, wins, winnerTime);
                            } else {
                                if (winnerParams.time > winnerTime) {
                                    await this.winners.updateWinner(
                                        this.baseApi,
                                        drivecar.id,
                                        winnerParams.wins + 1,
                                        winnerTime
                                    );
                                } else {
                                    await this.winners.updateWinner(
                                        this.baseApi,
                                        drivecar.id,
                                        winnerParams.wins + 1,
                                        winnerParams.time
                                    );
                                }
                            }
                            await this.winners.getWinners(
                                this.baseApi,
                                localStorage.getItem('pagewinners')?.toString()
                            );
                            await this.generatetable.showTable();
                            await this.generatetable.winnersCounter();
                        }
                    }
                })
            );

            (document.getElementById('prev-page') as HTMLInputElement).disabled = false;
            (document.getElementById('next-page') as HTMLInputElement).disabled = false;
            setTimeout(() => {
                if (document.body.contains(document.querySelector('.winner-title'))) {
                    document.body.removeChild(document.querySelector('.winner-title') as HTMLElement);
                }
            }, 5000);
        };
    }

    async resetBlock() {
        const buttonReset = document.createElement('button');
        buttonReset.innerText = 'Reset';
        buttonReset.id = 'reset-button';
        buttonReset.disabled = true;
        (document.querySelector('.control-panel__dynamic') as HTMLElement).appendChild(buttonReset);

        buttonReset.onclick = async (e) => {
            e.preventDefault();
            buttonReset.disabled = true;
            (document.getElementById('race-button') as HTMLInputElement).disabled = false;
            if (document.body.contains(document.querySelector('.winner-title'))) {
                document.body.removeChild(document.querySelector('.winner-title') as HTMLElement);
            }
            const data: ICars[] = (await JSON.parse(localStorage.getItem('data') as string)) || [];
            document.querySelectorAll('.stopped').forEach((button) => ((button as HTMLInputElement).disabled = true));
            document.querySelectorAll('.started').forEach((button) => ((button as HTMLInputElement).disabled = false));
            await Promise.all(
                data.map(async (drivecar) => {
                    await this.garage.stopCar(this.baseApi, drivecar.id.toString(), Status.stop);
                    await this.animateOnStop('car-image' + drivecar.id.toString());
                })
            );
        };
    }

    async animateOnStart(id: string, time: number, distance: number) {
        const carImage = document.getElementById(id) as HTMLImageElement;
        carImage?.animate(
            [
                { transform: 'translateX(0px)' },
                {
                    transform: `translateX(${distance}px)`,
                },
            ],
            {
                // timing options
                duration: time,
                iterations: 1,
                fill: 'forwards',
            }
        );
    }

    async animateOnStop(id: string) {
        const carImage = document.getElementById(id) as HTMLImageElement;
        carImage?.getAnimations().map((anim) => anim.cancel());
        carImage?.animate(
            [
                {
                    transform: `translateX(${
                        (document.getElementsByClassName('race-line')[0] as HTMLElement).offsetWidth - 80
                    }px)`,
                },
                { transform: 'translateX(0px)' },
            ],
            {
                fill: 'forwards',
            }
        );
    }

    async animateOnDrive(id: string) {
        const carImage = document.getElementById(id) as HTMLImageElement;
        carImage?.getAnimations().map((anim) => anim.pause());
    }

    async showGenerateCars() {
        const buttonGenerateCars = document.createElement('button');
        buttonGenerateCars.innerText = 'Generate';
        buttonGenerateCars.id = 'generate-cars-button';
        (document.querySelector('.control-panel__dynamic') as HTMLElement).appendChild(buttonGenerateCars);

        buttonGenerateCars.onclick = async (e) => {
            e.preventDefault();
            const brands: string[] = [
                'Audi',
                'BMW',
                'Chevrolet',
                'Hyundai',
                'Kia',
                'Mercedes-Benz',
                'Porsche',
                'Tesla',
                'Toyota',
                'Volkswagen',
            ];
            const models: string[] = [
                'A8',
                'M5',
                'Camaro',
                'Sonata',
                'Carnival',
                'W221',
                'Cayenne',
                'Model Y',
                'Camry',
                'Tiguan',
            ];

            const arrayRandom = Array.from({ length: 100 }, () => {
                return {
                    name: brands[Math.floor(Math.random() * 10)] + ' ' + models[Math.floor(Math.random() * 10)],
                    color: '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
                };
            });
            await this.loaderStart();
            await Promise.all(
                arrayRandom.map(async (newcar) => {
                    await this.garage.createCar(this.baseApi, newcar.name, newcar.color);
                })
            );
            await this.loaderStop();
            await this.garage.getCars(this.baseApi, localStorage.getItem('pagenum')?.toString());
            await this.showCars();

            if ((await JSON.parse(localStorage.getItem('data') as string).length) == this.carsLimitPerPage) {
                (document.getElementById('next-page') as HTMLInputElement).disabled = false;
            }
            (
                document.querySelector('.control-panel__counter--cars') as HTMLElement
            ).innerText = `Garage (${await JSON.parse(localStorage.getItem('totalcars') as string)})`;
        };
    }

    async loaderStart() {
        const loader = document.createElement('div');
        const loaderRipple = document.createElement('div');
        loader.className = 'lds-ripple';
        loader.append(loaderRipple, loaderRipple);

        const garageContent = document.querySelector('.garage-content') as HTMLElement;
        garageContent.style.filter = 'blur(10px)';
        document.body.append(loader);
    }

    async loaderStop() {
        const loader = document.querySelector('.lds-ripple') as HTMLElement;
        const garageContent = document.querySelector('.garage-content') as HTMLElement;
        garageContent.style.filter = 'blur(0)';
        document.body.removeChild(loader);
    }

    async showPages() {
        let pageNum = 1;
        localStorage.setItem('pagenum', pageNum.toString());

        (document.getElementById('next-page') as HTMLInputElement).onclick = async () => {
            (document.getElementById('prev-page') as HTMLInputElement).disabled = false;
            pageNum = Number(localStorage.getItem('pagenum'));
            pageNum++;
            (document.querySelector('.control-panel__counter--page') as HTMLElement).innerText = `Page (${pageNum})`;
            localStorage.setItem('pagenum', pageNum.toString());
            await this.garage.getCars(this.baseApi, pageNum.toString());
            if ((await JSON.parse(localStorage.getItem('data') as string).length) < this.carsLimitPerPage) {
                (document.getElementById('next-page') as HTMLInputElement).disabled = true;
            }
            await this.showCars();
        };

        (document.getElementById('prev-page') as HTMLInputElement).onclick = async () => {
            pageNum = Number(localStorage.getItem('pagenum'));
            pageNum--;
            (document.querySelector('.control-panel__counter--page') as HTMLElement).innerText = `Page (${pageNum})`;
            localStorage.setItem('pagenum', pageNum.toString());
            if (pageNum == 1) {
                (document.getElementById('prev-page') as HTMLInputElement).disabled = true;
            }
            await this.garage.getCars(this.baseApi, pageNum.toString());
            if ((await JSON.parse(localStorage.getItem('data') as string).length) == this.carsLimitPerPage) {
                (document.getElementById('next-page') as HTMLInputElement).disabled = false;
            }
            await this.showCars();
        };
    }

    async counterBlock() {
        const pageCounter = document.createElement('div');
        pageCounter.className = 'control-panel__counter--page';
        pageCounter.innerText = `Page (${localStorage.getItem('pagenum') as string})`;

        const carsCounter = document.createElement('div');
        carsCounter.className = 'control-panel__counter--cars';
        carsCounter.innerText = `Garage (${await JSON.parse(localStorage.getItem('totalcars') as string)})`;
        (document.querySelector('.control-panel__counter') as HTMLElement).append(carsCounter, pageCounter);
    }
}

export default GenerateHtml;
