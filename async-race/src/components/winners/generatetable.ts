import Garage, { ICars } from '../garage/garage';
import Winners, { IWinners } from './winners';

const baseApi = 'http://127.0.0.1:3000/';
const winnersLimitPerPage = 10;
class GenerateTable {
    winners: Winners;
    garage: Garage;
    baseApi: string;
    winnersLimitPerPage: number;
    constructor() {
        this.baseApi = baseApi;
        this.winnersLimitPerPage = winnersLimitPerPage;
        this.winners = new Winners();
        this.garage = new Garage();
    }

    async winnersContent() {
        const counter = document.createElement('div');
        counter.className = 'winners-counter';
        const counterTotal = document.createElement('div');
        counterTotal.className = 'winners-counter__total';
        const counterPage = document.createElement('div');
        counterPage.className = 'winners-counter__page';
        counter.append(counterTotal, counterPage);

        const tableContainer = document.createElement('table');
        tableContainer.className = 'table-container';
        const table = document.createElement('table');
        table.id = 'table';
        const tableHead = document.createElement('thead');
        tableHead.id = 'thead';
        const headRow = document.createElement('tr');
        const headNumber = document.createElement('th');
        const headNumberText = document.createTextNode('Number');
        headNumber.append(headNumberText);
        const headCar = document.createElement('th');
        const headCarText = document.createTextNode('Car');
        headCar.append(headCarText);
        const headName = document.createElement('th');
        const headNameText = document.createTextNode('Name');
        headName.append(headNameText);
        const headWins = document.createElement('th');
        headWins.id = 'head-wins';
        headWins.className = 'head-wins';
        const headWinsText = document.createTextNode('Wins');
        headWins.append(headWinsText);
        const headBestTime = document.createElement('th');
        headBestTime.id = 'head-besttime';
        headBestTime.className = 'head-besttime';
        const headBestTimeText = document.createTextNode('Best time (s)');
        headBestTime.append(headBestTimeText);
        headRow.append(headNumber, headCar, headName, headWins, headBestTime);
        tableHead.append(headRow);
        const tableBody = document.createElement('tbody');
        tableBody.id = 'tbody';
        table.append(tableHead, tableBody);
        tableContainer.append(table);

        const wPagination = document.createElement('div');
        wPagination.className = 'winners-pagination';
        const prevPage = document.createElement('button');
        prevPage.id = 'prev-page-w';
        prevPage.innerText = 'PREV';
        prevPage.disabled = true;
        const nextPage = document.createElement('button');
        nextPage.id = 'next-page-w';
        nextPage.innerText = 'NEXT';

        wPagination.append(prevPage, nextPage);
        (document.querySelector('.winners-content') as HTMLElement).append(counter, tableContainer, wPagination);
    }

    async showTable() {
        const allCarData = await fetch(this.baseApi + 'garage');
        const carDataResponse: ICars[] = (await allCarData.json()) || [];
        const winnersData: IWinners[] = (await JSON.parse(localStorage.getItem('winners') as string)) || [];
        const tableBody = document.getElementById('tbody') as HTMLElement;

        tableBody.innerText = '';
        winnersData.forEach(async (winner, index) => {
            const row = document.createElement('tr');

            const number = document.createElement('td');
            const numberText = document.createTextNode((index + 1).toString());
            number.append(numberText);

            const carData = carDataResponse.filter((item) => item.id === winner.id);
            const car = document.createElement('td');
            car.append(await this.svgImage(carData[0].color));

            const name = document.createElement('td');
            const nameText = document.createTextNode(carData[0].name);
            name.append(nameText);

            const wins = document.createElement('td');
            const winsText = document.createTextNode(winner.wins.toString());
            wins.append(winsText);

            const bestTime = document.createElement('td');
            const bestTimeText = document.createTextNode(winner.time.toString());
            bestTime.append(bestTimeText);

            row.append(number, car, name, wins, bestTime);
            tableBody.append(row);
        });
    }

    async svgImage(color: string) {
        const carImage = document.createElement('div');
        carImage.innerHTML = `<svg class="car-image" id="car-image11" style="height: 30px; width: 80px;"><g fill="${color}"><path d="m15.84993,14.03183c-3.79257,0 -6.86245,3.41748 -6.86245,7.63949c0,4.22201 3.06988,7.63949 6.86245,7.63949s6.86245,-3.41748 6.86245,-7.63949c0,-4.22201 -3.06988,-7.63949 -6.86245,-7.63949l0,0zm13.02777,-6.10162c0.37734,0.90421 0.67793,1.91521 0.90817,3.01165c0.52444,1.82978 -0.24943,2.21424 -2.04019,1.46667c-1.31749,-0.87573 -2.63497,-1.75858 -3.95246,-2.63431c-0.67153,-0.52686 -0.99131,-1.0466 -0.88259,-1.55922c0.21745,-1.011 1.96984,-1.53787 3.40884,-1.85113c1.82913,-0.40583 1.70122,-0.49126 2.55823,1.56634l0,0l-0.00001,0zm35.29715,10.18836c-1.75878,0 -3.19139,1.5877 -3.19139,3.55275c0,1.95793 1.42621,3.55275 3.19139,3.55275c1.75878,0 3.19139,-1.5877 3.19139,-3.55275c0,-1.96505 -1.42621,-3.55275 -3.19139,-3.55275l0,0zm-48.32492,0c-1.75878,0 -3.19139,1.5877 -3.19139,3.55275c0,1.95793 1.42621,3.55275 3.19139,3.55275c1.75878,0 3.19139,-1.5877 3.19139,-3.55275c0,-1.96505 -1.42621,-3.55275 -3.19139,-3.55275l0,0zm34.07559,-4.84855c-1.77157,-2.11457 -3.81816,-3.48868 -6.18451,-4.81295c-5.18041,-2.90486 -8.35261,-2.54887 -13.8528,-2.54887l1.84832,5.33981c0.77386,1.13916 1.65005,1.94369 2.98034,2.02201l15.20866,0l0,0l-0.00001,0zm14.24933,0.76181c-3.79257,0 -6.86245,3.41748 -6.86245,7.63949c0,4.22201 3.06988,7.63949 6.86245,7.63949s6.86245,-3.41748 6.86245,-7.63949c0,-4.22201 -3.06988,-7.63949 -6.86245,-7.63949l0,0zm-10.84688,-2.32816c-2.25124,-1.55922 -4.70074,-2.9547 -7.41246,-4.14369c-8.25668,-3.62395 -14.5691,-4.27185 -23.22871,-1.35275c-2.60939,1.10356 -5.21878,2.20712 -7.82818,2.89062c-2.57741,0.6835 -13.73768,1.33851 -14.01269,3.4246l2.75649,3.66667c-1.00411,0.96829 -1.82274,2.15728 -2.12333,4.01554c0.08314,1.14628 0.36455,2.10745 0.85061,2.87638c0.82503,1.31715 3.24255,2.67703 4.54725,1.90097c0.41571,-0.24919 0.65235,-0.74757 0.64595,-1.59482c-0.03837,-17.0162 18.41284,-15.07963 17.02501,2.00777l32.19529,0c-5.96067,-17.11587 19.46811,-17.17995 14.95284,-0.59094c1.5861,1.90809 5.32751,-0.96829 7.73864,-7.08415c-0.65874,-0.72621 -1.38144,-1.41683 -2.18729,-2.05761c0.03837,-0.0356 -0.03837,0.13528 0.09593,-0.12104c0.13431,-0.25631 -0.32618,-1.33139 -1.27272,-1.95081c-4.96296,-3.23949 -16.92907,-3.15405 -22.74264,-1.88673l0,0z" style="stroke: rgb(0, 0, 0); width: 2px;"></path></g></svg>`;
        return carImage;
    }

    async winnersPages() {
        let pageNumW = 1;
        localStorage.setItem('pagewinners', pageNumW.toString());
        if ((await JSON.parse(localStorage.getItem('winners') as string).length) == this.winnersLimitPerPage) {
            (document.getElementById('next-page-w') as HTMLInputElement).disabled = false;
        }

        (document.getElementById('next-page-w') as HTMLInputElement).onclick = async () => {
            (document.getElementById('prev-page-w') as HTMLInputElement).disabled = false;
            pageNumW = Number(localStorage.getItem('pagewinners'));
            pageNumW++;
            (document.querySelector('.winners-counter__page') as HTMLElement).innerText = `Page (${pageNumW})`;
            localStorage.setItem('pagewinners', pageNumW.toString());
            await this.winners.getWinners(this.baseApi, pageNumW.toString());
            if ((await JSON.parse(localStorage.getItem('winners') as string).length) < this.winnersLimitPerPage) {
                (document.getElementById('next-page-w') as HTMLInputElement).disabled = true;
            }
            await this.showTable();
        };

        (document.getElementById('prev-page-w') as HTMLInputElement).onclick = async () => {
            pageNumW = Number(localStorage.getItem('pagewinners'));
            pageNumW--;
            (document.querySelector('.winners-counter__page') as HTMLElement).innerText = `Page (${pageNumW})`;
            localStorage.setItem('pagewinners', pageNumW.toString());
            if (pageNumW == 1) {
                (document.getElementById('prev-page-w') as HTMLInputElement).disabled = true;
            }
            await this.winners.getWinners(this.baseApi, pageNumW.toString());
            if ((await JSON.parse(localStorage.getItem('winners') as string).length) == this.winnersLimitPerPage) {
                (document.getElementById('next-page-w') as HTMLInputElement).disabled = false;
            }
            await this.showTable();
        };
    }

    async winnersCounter() {
        (document.querySelector('.winners-counter__total') as HTMLElement).innerText = `Winners (${await JSON.parse(
            localStorage.getItem('totalwinners') as string
        )})`;
        (document.querySelector('.winners-counter__page') as HTMLElement).innerText = `Page (${await JSON.parse(
            localStorage.getItem('pagewinners') as string
        )})`;
    }

    async sortWinners() {
        const headWins = document.getElementById('head-wins') as HTMLTableElement;
        headWins.onclick = async () => {
            if (!headWins.classList.contains('asc') && !headWins.classList.contains('desc')) {
                headWins.classList.add('asc');
                const page = (await localStorage.getItem('pagewinners')) as string;
                localStorage.setItem('sort', 'wins');
                localStorage.setItem('order', 'ASC');
                await this.winners.getWinners(this.baseApi, page, 'wins', 'ASC');
                await this.showTable();
                return;
            }
            if (headWins.classList.contains('asc')) {
                headWins.classList.remove('asc');
                const page = (await localStorage.getItem('pagewinners')) as string;
                localStorage.setItem('sort', 'wins');
                localStorage.setItem('order', 'DESC');
                await this.winners.getWinners(this.baseApi, page, 'wins', 'DESC');
                await this.showTable();
                headWins.classList.add('desc');
                return;
            }
            if (headWins.classList.contains('desc')) {
                headWins.classList.remove('desc');
                const page = (await localStorage.getItem('pagewinners')) as string;
                localStorage.setItem('sort', 'null');
                localStorage.setItem('order', 'null');
                await this.winners.getWinners(this.baseApi, page);
                await this.showTable();
                return;
            }
        };

        const headBest = document.getElementById('head-besttime') as HTMLTableElement;
        headBest.onclick = async () => {
            if (!headBest.classList.contains('asc') && !headBest.classList.contains('desc')) {
                headBest.classList.add('asc');
                const page = (await localStorage.getItem('pagewinners')) as string;
                localStorage.setItem('sort', 'time');
                localStorage.setItem('order', 'ASC');
                await this.winners.getWinners(this.baseApi, page, 'time', 'ASC');
                await this.showTable();
                return;
            }
            if (headBest.classList.contains('asc')) {
                headBest.classList.remove('asc');
                const page = (await localStorage.getItem('pagewinners')) as string;
                localStorage.setItem('sort', 'time');
                localStorage.setItem('order', 'DESC');
                await this.winners.getWinners(this.baseApi, page, 'time', 'DESC');
                await this.showTable();
                headBest.classList.add('desc');
                return;
            }
            if (headBest.classList.contains('desc')) {
                headBest.classList.remove('desc');
                const page = (await localStorage.getItem('pagewinners')) as string;
                localStorage.setItem('sort', 'null');
                localStorage.setItem('order', 'null');
                await this.winners.getWinners(this.baseApi, page);
                await this.showTable();
                return;
            }
        };
    }
}

export default GenerateTable;
