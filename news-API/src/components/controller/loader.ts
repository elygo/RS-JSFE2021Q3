/* eslint-disable no-console */
import { Inews } from '../view/news/news';
import { Isource } from '../view/sources/sources';

type Resp = {
    endpoint: string;
    options: object;
};

export type Callback<T> = (data?: T) => void;

enum ErrorStatus {
    Unauthorized = 401,
    PaymentRequired,
    ForbiddenResponse,
    NotFound,
}
class Loader {
    private baseLink: string;
    private options: { [key: string]: string };
    public constructor(baseLink: string, options: { [key: string]: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options }: Resp,
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrorStatus.Unauthorized || res.status === ErrorStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: { [key: string]: string }, endpoint: string): string {
        const urlOptions: { [key: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?` as string;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&` as string;
        });

        return url.slice(0, -1);
    }

    public load(method: string, endpoint: string, callback: (data?: Inews | Isource) => void, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
