const baseApi = 'http://127.0.0.1:3000';

class Winners {
    baseApi: string;
    constructor() {
        this.baseApi = baseApi;
    }

    async showWinners() {
        const response = await fetch(this.baseApi + '/winners');
        const data = await response.json();
        (document.querySelector('.winners-content') as HTMLElement).innerHTML = 'Winners';
        console.log(data);
    }
}

export default Winners;
