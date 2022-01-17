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
        await this.generatehtml.template();
        await this.generatehtml.showCars();
        await this.generatehtml.removeupdateCars();
        await this.generatehtml.createCarBlock();
        await this.generatehtml.updateCarBlock();
        await this.generatehtml.showPages();
    }
}

export default App;
