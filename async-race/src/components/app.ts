import Garage from './garage/garage';
import Winners from './winners/winners';
import GenerateHtml from './garage/generatehtml';
class App {
    garage: Garage;
    winners: Winners;
    generatehtml: GenerateHtml;
    constructor() {
        this.garage = new Garage();
        this.winners = new Winners();
        this.generatehtml = new GenerateHtml();
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

        const footerTitle = document.createElement('span');
        footerTitle.innerText = 'Developed by Elyor Farmonov';

        footer.appendChild(footerTitle);
        document.body.append(header, main, footer);
    }

    async start() {
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

        linkGarage.onclick = async () => {
            garageContent.style.display = 'flex';
            winnersContent.style.display = 'none';
        };

        linkWinners.onclick = async () => {
            garageContent.style.display = 'none';
            winnersContent.style.display = 'flex';
            await this.winners.showWinners();
        };
    }
}

export default App;
