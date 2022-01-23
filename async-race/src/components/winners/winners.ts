export interface IWinners {
    id: number;
    wins: number;
    time: number;
}

const baseApi = 'http://127.0.0.1:3000/';
const winnersPerPage = 10;
class Winners {
    baseApi: string;
    winnersPerPage: number;
    constructor() {
        this.baseApi = baseApi;
        this.winnersPerPage = winnersPerPage;
    }

    async getWinners(url: string, page?: string, sort?: string, order?: string) {
        try {
            if (!page) page = '1';
            const sortWinners = sort || (localStorage.getItem('sort') as string);
            const orderWinners = order || (localStorage.getItem('order') as string);
            const response = await fetch(
                url + `winners?_page=${page}&_limit=${this.winnersPerPage}&_sort=${sortWinners}&_order=${orderWinners}`
            );
            const winners: IWinners[] = (await response.json()) || [];
            localStorage.setItem('winners', JSON.stringify(winners));
            localStorage.setItem('totalwinners', JSON.stringify(response.headers.get('X-Total-Count')));
        } catch (error) {
            console.log(error);
        }
    }

    async getWinner(url: string, id: number) {
        try {
            const response = await fetch(url + 'winners/' + id.toString());
            if (response.status === 404) {
                console.log(`Car#${id} is not found`);
                return false;
            }
            const winner: IWinners = (await response.json()) || [];
            return winner;
        } catch (error) {
            console.log(error);
        }
    }

    async createWinner(url: string, id: number, wins: number, time: number) {
        try {
            await fetch(url + 'winners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    wins: wins,
                    time: time,
                }),
            });
        } catch (error) {
            console.log(error);
        }
    }

    async updateWinner(url: string, id: number, wins: number, time: number) {
        try {
            await fetch(url + 'winners/' + id.toString(), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    wins: wins,
                    time: time,
                }),
            });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteWinner(url: string, id: string) {
        try {
            await fetch(url + `winners/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default Winners;
