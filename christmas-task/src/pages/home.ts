const HomePage = {
    render: async (): Promise<string> => {
        return `
        <section class="home">
            <div class="home__title-container">
                <div class="home__title">Помогите бабушке нарядить елку</div>
            </div>
            <button class="home__start" onclick="location.href='/#/toys'" type="button">Начать</button>            
        </section>`;
    },
    after_render: async (): Promise<void> => {
        (document.getElementById('navbar-search') as HTMLInputElement).focus();
        (document.getElementById('navbar-search') as HTMLInputElement).select();

        if ((document.getElementById('item-counter') as HTMLInputElement) && localStorage.getItem('select') !== null) {
            (document.getElementById('item-counter') as HTMLInputElement).innerHTML = JSON.parse(
                localStorage.getItem('select') as string
            ).selected.length.toString();
        }
    },
};

export default HomePage;
