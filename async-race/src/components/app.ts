import Garage from './garage/garage';
import Winners from './winners/winners';

class App {
    garage: Garage;
    winners: Winners;
    constructor() {
        this.garage = new Garage();
        this.winners = new Winners();
    }

    start() {
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

        const footer = document.createElement('footer');
        footer.className = 'footer';
        const footerTitle = document.createElement('span');
        footerTitle.innerText = 'Developed by Elyor Farmonov';
        footer.appendChild(footerTitle);
        document.body.append(header, main, footer);

        if (
            document.querySelector('.content')?.innerHTML === '' ||
            document.querySelector('.content')?.innerHTML === undefined
        ) {
            (document.querySelector('.content') as HTMLElement).innerHTML = this.garage.show('automobiles');
        }
        document.querySelector('.link-garage')?.addEventListener('click', () => {
            (document.querySelector('.content') as HTMLElement).innerHTML = this.garage.show('automobiles');
        });
        document.querySelector('.link-winners')?.addEventListener('click', () => {
            (document.querySelector('.content') as HTMLElement).innerHTML = this.winners.show('ranking');
        });
    }
}

export default App;
