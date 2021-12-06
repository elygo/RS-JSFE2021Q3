import News, { Inews } from './news/news';
import Sources, { Isource } from './sources/sources';

export interface IDrawNews {
    status: string;
    totalResults: number;
    articles: Inews[];
}

export interface IDrawSources {
    status: string;
    sources: Isource[];
}
export class AppView {
    news: News;
    sources: Sources;
    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: IDrawNews): void {
        const values: Inews[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: IDrawSources): void {
        const values: Isource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
