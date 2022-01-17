export interface ICars {
    name: string;
    color: string;
    id: number;
}

const baseApi = 'http://127.0.0.1:3000/';
class Garage {
    baseApi: string;
    constructor() {
        this.baseApi = baseApi;
    }

    async getCars(url: string, page?: string) {
        if (!page) page='1'; 
        const response = await fetch(url + `garage?_page=${page}&_limit=7`);
        const data = await response.json();
        localStorage.setItem('data', JSON.stringify(data));
    }

    async createCar(url: string, name: string, color: string) {
        await fetch(url + 'garage', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                name: name,
                color: color,
            }),
        });
        await this.getCars(this.baseApi);
    }

    async removeCar(url: string, id: string) {
        await fetch(url + `garage/${id}`, {
            method: 'DELETE',
        }).then((res) => res.json());
    }

    async updateCar(url: string, id: string, name: string, color: string) {
        await fetch(url + `garage/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                color: color,
            }),
        });
    }

    async startstopCar(url: string, id: string, status: string) {
        await fetch(url + `engine?id=${id}&status=${status}`, {
            method: 'PATCH',
        }).then((res) => res.json());
    }
}

export default Garage;
