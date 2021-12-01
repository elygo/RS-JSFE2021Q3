import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '2889ed7825a84ddea353c14e7451245d', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
