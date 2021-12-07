import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '68c4fc537e12420292167f524b0759de', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
