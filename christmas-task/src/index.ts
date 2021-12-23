import './style.scss';
import ErrorPage from './pages/error';

import Header from './components/header';
import Footer from './components/footer';

import Utils from './utils/utils';
import Routes from './utils/routes';

//import data from './data';
// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async (): Promise<void> => {
    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');
    // Render the Header and footer of the page
    (header as HTMLElement).innerHTML = await Header.render();
    await Header.after_render();
    (footer as HTMLElement).innerHTML = await Footer.render();
    await Footer.after_render();

    // Get the parsed URl from the addressbar
    const request = Utils.parseRequestURL();

    // Parse the URL and if it has an id part, change it with the string ":id"
    const parsedURL: string =
        (request.resource ? '/' + request.resource : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? '/' + request.verb : '');

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    const page: { render: () => Promise<string>; after_render: () => Promise<void> } = Routes[parsedURL]
        ? Routes[parsedURL]
        : ErrorPage;
    (content as HTMLElement).innerHTML = await page.render();
    await page.after_render();
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
