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
