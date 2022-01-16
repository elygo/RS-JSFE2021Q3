import Garage from './garage/garage';
import GenerateHtml from './garage/generatehtml';
class App {
    garage: Garage;
    generatehtml: GenerateHtml;
    constructor() {
        this.garage = new Garage();
        this.generatehtml = new GenerateHtml();
    }

    async start() {
        await this.garage.getCars(this.garage.baseApi);
        this.generatehtml.template();
        this.generatehtml.showCars();
        this.generatehtml.removeupdateCars();
        this.generatehtml.createCarBlock();
        this.generatehtml.updateCarBlock();
    }
}

export default App;
