export interface ICars {
    name: string;
    color: string;
    id: number;
}

const baseApi = 'http://127.0.0.1:3000/';
const carsPerPage = 7;
class Garage {
    baseApi: string;
    carsPerPage: number;
    constructor() {
        this.baseApi = baseApi;
        this.carsPerPage = carsPerPage;
    }

    async getCar(url: string, id: string) {
        try {
            const response = await fetch(url + `garage/${id}`);
            const data: ICars = (await response.json()) || [];
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getCars(url: string, page?: string) {
        try {
            if (!page) page = '1';
            const response = await fetch(url + `garage?_page=${page}&_limit=${this.carsPerPage}`);
            const data: ICars[] = (await response.json()) || [];
            localStorage.setItem('data', JSON.stringify(data));
            localStorage.setItem('totalcars', JSON.stringify(response.headers.get('X-Total-Count')));
        } catch (error) {
            console.log(error);
        }
    }

    async createCar(url: string, name: string, color: string) {
        try {
            await fetch(url + 'garage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    color: color,
                }),
            });
            await this.getCars(this.baseApi);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCar(url: string, id: string) {
        try {
            await fetch(url + `garage/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.log(error);
        }
    }

    async updateCar(url: string, id: string, name: string, color: string) {
        try {
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
        } catch (error) {
            console.log(error);
        }
    }

    async startCar(url: string, id: string, status: string) {
        try {
            const response = await fetch(url + `engine?id=${id}&status=${status}`, {
                method: 'PATCH',
            });
            const driveParams = (await response.json()) || [];
            const time = driveParams.distance / driveParams.velocity;
            return time;
        } catch (error) {
            console.log(error);
        }
    }

    async stopCar(url: string, id: string, status: string) {
        try {
            await fetch(url + `engine?id=${id}&status=${status}`, {
                method: 'PATCH',
            });
        } catch (error) {
            console.log(error);
        }
    }

    async driveCar(url: string, id: string, status = 'drive') {
        try {
            const response = await fetch(url + `engine?id=${id}&status=${status}`, {
                method: 'PATCH',
            });
            if (response.status === 500) {
                console.log(`The engine of car#${id} is broken`);
                return false;
            }
            return (await response.json()).success;
        } catch (error) {
            console.log(error);
        }
    }
}

export default Garage;
