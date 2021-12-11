import HomePage from '../pages/home';
import ToysPage from '../pages/toys';
import TreePage from '../pages/tree';

interface Ipage {
    [key: string]: { render: () => Promise<string>; after_render: () => Promise<void> };
}

const Routes: Ipage = {
    '/': HomePage,
    '/toys': ToysPage,
    '/tree': TreePage,
};

export default Routes;
