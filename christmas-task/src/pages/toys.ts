import sectionToys from '../utils/iterate';

const ToysPage = {
    render: async () => {
        return sectionToys.outerHTML;
        // return `
        // <section class="toys">
        //     <div class="toys__filter">
        //         <div class="toys__filter-quantity"></div>
        //         <div class="toys__filter-range"></div>
        //         <div class="toys__filter-sort"></div>
        //     </div>
        //     <div class="toys__items" id="toys__items">
        //         <div class="toys_item"></div>
        //     </div>
        // </section>`;
    },
    after_render: async () => {},
};

export default ToysPage;
