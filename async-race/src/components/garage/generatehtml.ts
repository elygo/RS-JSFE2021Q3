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

    async template() {
        const header = document.createElement('header');
        header.className = 'header';

        const nav = document.createElement('nav');
        nav.className = 'nav';

        const buttonGarage = document.createElement('button');
        buttonGarage.className = 'link-garage';
        buttonGarage.innerText = 'Garage';

        const buttonWinners = document.createElement('button');
        buttonWinners.innerText = 'Winners';
        buttonWinners.className = 'link-winners';

        nav.append(buttonGarage, buttonWinners);
        header.append(nav);

        const main = document.createElement('main');
        main.className = 'main';

        const content = document.createElement('div');
        content.className = 'content';

        main.append(content);

        const control = document.createElement('div');
        control.className = 'control-panel';

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
        content.append(control, cars, pagination);

        const footer = document.createElement('footer');
        footer.className = 'footer';

        const footerTitle = document.createElement('span');
        footerTitle.innerText = 'Developed by Elyor Farmonov';

        footer.appendChild(footerTitle);
        document.body.append(header, main, footer);
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
            carName.innerHTML = element.name;
            carName.className = 'name';

            deleteCar.innerText = 'Delete';
            deleteCar.className = 'delete';
            deleteCar.id = element.id.toString();

            selectCar.innerText = 'Select';
            selectCar.className = 'select';
            selectCar.id = element.id.toString();

            startCar.innerText = 'Start';
            startCar.className = 'started';
            startCar.id = element.id.toString();

            stopCar.innerText = 'Stop';
            stopCar.disabled = true;
            stopCar.className = 'stopped';
            stopCar.id = element.id.toString();

            carImage.src = car;
            carImage.className = 'car-image';
            carImage.id = 'car-image' + element.id.toString();
            carImage.setAttribute('path', '#f94d4d');
            carImage.height = 40;
            carImage.width = 80;

            raceLine.className = 'race-line';
            raceLine.append(carImage);

            carBlock.className = 'car-block';
            carBlock.append(carName, deleteCar, selectCar, startCar, stopCar, raceLine);
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

        const buttonCreateCar = document.createElement('input');
        buttonCreateCar.type = 'button';
        buttonCreateCar.value = 'Create';
        buttonCreateCar.id = 'create-car-button';

        const createCarBlock = document.createElement('div');
        createCarBlock.className = 'control-panel__create-car';
        createCarBlock.append(nameCreateCar, colorCreateCar, buttonCreateCar);
        (document.querySelector('.control-panel') as HTMLElement).appendChild(createCarBlock);

        buttonCreateCar.onclick = async (e) => {
            e.preventDefault();
            await this.garage.createCar(this.baseApi, nameCreateCar.value, colorCreateCar.value);
            await this.garage.getCars(this.baseApi, localStorage.getItem('pagenum')?.toString());
            await this.showCars();
            nameCreateCar.value = '';
            if ((await JSON.parse(localStorage.getItem('data') as string).length) == this.carsLimitPerPage) {
                (document.getElementById('next-page') as HTMLInputElement).disabled = false;
            }
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

        const buttonUpdateCar = document.createElement('input');
        buttonUpdateCar.type = 'button';
        buttonUpdateCar.value = 'Update';
        buttonUpdateCar.id = 'update-car-button';
        buttonUpdateCar.disabled = true;

        const updateCarBlock = document.createElement('div');
        updateCarBlock.className = 'control-panel__update-car';
        updateCarBlock.append(nameUpdateCar, colorUpdateCar, buttonUpdateCar);
        (document.querySelector('.control-panel') as HTMLElement).appendChild(updateCarBlock);
    }

    // async raceBlock () {}
    // async resetBlock () {}
    // async showGenerateCars () {}
    async showPages() {
        let pageNum = 1;
        localStorage.setItem('pagenum', pageNum.toString());

        (document.getElementById('next-page') as HTMLInputElement).onclick = async () => {
            (document.getElementById('prev-page') as HTMLInputElement).disabled = false;
            pageNum = Number(localStorage.getItem('pagenum'));
            pageNum++;
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
}

export default GenerateHtml;
