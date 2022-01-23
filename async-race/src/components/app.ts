import Garage from './garage/garage';
import GenerateHtml from './garage/generatehtml';
import Winners from './winners/winners';
import GenerateTable from './winners/generatetable';
class App {
    garage: Garage;
    winners: Winners;
    generatehtml: GenerateHtml;
    generatetable: GenerateTable;
    constructor() {
        this.garage = new Garage();
        this.winners = new Winners();
        this.generatehtml = new GenerateHtml();
        this.generatetable = new GenerateTable();
    }

    async template() {
        const header = document.createElement('header');
        header.className = 'header';

        const nav = document.createElement('nav');
        nav.className = 'nav';

        const buttonGarage = document.createElement('button');
        buttonGarage.className = 'link-garage';
        buttonGarage.innerText = 'GARAGE';

        const buttonWinners = document.createElement('button');
        buttonWinners.className = 'link-winners';
        buttonWinners.innerText = 'WINNERS';

        nav.append(buttonGarage, buttonWinners);
        header.append(nav);

        const main = document.createElement('main');
        main.className = 'main';

        const garageContent = document.createElement('div');
        garageContent.className = 'garage-content';

        const winnersContent = document.createElement('div');
        winnersContent.className = 'winners-content';

        main.append(garageContent, winnersContent);

        const footer = document.createElement('footer');
        footer.className = 'footer';

        const github = document.createElement('a');
        github.setAttribute('href', 'https://github.com/elygo');
        github.innerText = 'Github: elygo';

        const footerTitle = document.createElement('span');
        footerTitle.innerText = 'Developed by Elyor Farmonov';

        const rsschool = document.createElement('a');
        rsschool.setAttribute('href', 'https://rs.school/');
        rsschool.innerText = 'RS-School 2022';

        footer.append(github, footerTitle, rsschool);
        document.body.append(header, main, footer);
    }

    async start() {
        try {
            await this.template();

            const garageContent = document.querySelector('.garage-content') as HTMLElement;
            const winnersContent = document.querySelector('.winners-content') as HTMLElement;
            const linkGarage = document.querySelector('.link-garage') as HTMLButtonElement;
            const linkWinners = document.querySelector('.link-winners') as HTMLButtonElement;

            await this.garage.getCars(this.garage.baseApi);
            await this.generatehtml.garageContent();
            await this.generatehtml.showCars();
            await this.generatehtml.removeupdateCars();
            await this.generatehtml.createCarBlock();
            await this.generatehtml.updateCarBlock();
            await this.generatehtml.raceBlock();
            await this.generatehtml.resetBlock();
            await this.generatehtml.showGenerateCars();
            await this.generatehtml.showPages();
            await this.generatehtml.counterBlock();

            winnersContent.style.display = 'none';
            await this.generatetable.winnersContent();
            await this.winners.getWinners(this.winners.baseApi);
            await this.generatetable.showTable();
            await this.generatetable.winnersPages();
            await this.generatetable.winnersCounter();
            await this.generatetable.sortWinners();

            linkGarage.onclick = async () => {
                garageContent.style.display = 'flex';
                winnersContent.style.display = 'none';
            };

            linkWinners.onclick = async () => {
                garageContent.style.display = 'none';
                winnersContent.style.display = 'flex';
            };
        } catch (error) {
            console.log(error);
            document.body.innerText = 'Please, check the backend server status!';
            document.body.style.fontSize = '30px';
        }
    }
}

export default App;
