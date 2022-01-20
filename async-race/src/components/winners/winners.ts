const baseApi = 'http://127.0.0.1:3000';

class Winners {
    baseApi: string;
    constructor() {
        this.baseApi = baseApi;
    }

    async show() {
        const response = await fetch(this.baseApi + '/winners');
        const data = await response.json();
        console.log(data);
    }
}

export default Winners;
