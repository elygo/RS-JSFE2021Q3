import { ICars } from './garage';
import Garage from './garage';

import car from './../../assets/car.svg';
const baseApi = 'http://127.0.0.1:3000/';
const carsLimitPerPage = 7;
class GenerateHtml {
    garage: Garage;
    baseApi: string;
    carsLimitPerPage: number;
    constructor() {
        this.baseApi = baseApi;
        this.carsLimitPerPage = carsLimitPerPage;
        this.garage = new Garage();
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
        const data: ICars[] = await JSON.parse(localStorage.getItem('data') as string);
        const carsList = document.getElementById('cars-list') as HTMLElement;

        const carName = document.createElement('div');
        const deleteCar = document.createElement('button');
        const selectCar = document.createElement('button');
        const startCar = document.createElement('button');
        const stopCar = document.createElement('button');
        const carImage = document.createElement('img');
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

            carImage.src = car;
            carImage.className = 'car-image';
            carImage.id = 'car-image' + element.id.toString();
            carImage.setAttribute('path', '#f94d4d');
            carImage.height = 40;
            carImage.width = 80;

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
                await this.garage.removeCar(this.baseApi, target.id);
                await this.garage.getCars(this.baseApi, localStorage.getItem('pagenum')?.toString());
                await this.showCars();

                if (carNumFromStorage < this.carsLimitPerPage) {
                    (document.getElementById('next-page') as HTMLInputElement).disabled = true;
                }
                (
                    document.querySelector('.control-panel__counter--cars') as HTMLElement
                ).innerText = `Garage (${await JSON.parse(localStorage.getItem('totalcars') as string)})`;
            }

            if (target.className == 'select') {
                const carNameUpdate = document.getElementById('name-updatecar-input') as HTMLInputElement;
                const carColorUpdate = document.getElementById('color-updatecar-input') as HTMLInputElement;
                const carUpdateButton = document.getElementById('update-car-button') as HTMLInputElement;

                carNameUpdate.disabled = false;
                carColorUpdate.disabled = false;
                carUpdateButton.disabled = false;

                carUpdateButton.onclick = async (e) => {
                    e.preventDefault();
                    await this.garage.updateCar(this.baseApi, target.id, carNameUpdate.value, carColorUpdate.value);
                    await this.garage.getCars(this.baseApi, localStorage.getItem('pagenum')?.toString());
                    await this.showCars();

                    carNameUpdate.value = '';
                    carNameUpdate.disabled = true;
                    carColorUpdate.disabled = true;
                    carUpdateButton.disabled = true;
                };
            }

            if (target.className == 'started') {
                if ((target.nextElementSibling as HTMLInputElement).id == target.id) {
                    (target.nextElementSibling as HTMLInputElement).disabled = false;
                    target.disabled = true;
                }
                await this.garage.startStopCar(this.baseApi, target.id, target.className);
                await this.animateOnStart('car-image' + target.id);
            }

            if (target.className == 'stopped') {
                if ((target.previousElementSibling as HTMLInputElement).id == target.id) {
                    (target.previousElementSibling as HTMLInputElement).disabled = false;
                    target.disabled = true;
                }
                await this.garage.startStopCar(this.baseApi, target.id, target.className);
                await this.animateOnStop('car-image' + target.id);
            }
        };
    }

    async animateOnStart(id: string) {
        (document.getElementById(id) as HTMLImageElement).animate(
            [
                { transform: 'translateX(0px)' },
                {
                    transform: `translateX(${
                        (document.getElementsByClassName('race-line')[0] as HTMLElement).offsetWidth - 80
                    }px)`,
                },
            ],
            {
                // timing options
                duration: 10000,
                iterations: 1,
                fill: 'forwards',
            }
        );
    }

    async animateOnStop(id: string) {
        (document.getElementById(id) as HTMLImageElement).getAnimations().map((anim) => anim.cancel());
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
    }

    async resetBlock() {
        const buttonReset = document.createElement('button');
        buttonReset.innerText = 'Reset';
        buttonReset.id = 'reset-button';
        buttonReset.disabled = true;
        (document.querySelector('.control-panel__dynamic') as HTMLElement).appendChild(buttonReset);
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

            await Promise.all(
                arrayRandom.map(async (newcar) => {
                    await this.garage.createCar(this.baseApi, newcar.name, newcar.color);
                })
            );

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
