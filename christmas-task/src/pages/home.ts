const HomePage = {
    render: async () => {
        return `
        <section class="home">
            <div class="home__title-container">
                <div class="home__title">Помогите бабушке нарядить елку</div>
            </div>
            <button class="home__start" onclick="location.href='/elygo-JSFE2021Q3/christmas-task-part1/#/toys'" type="button">Начать</button>            
        </section>`;
    },
    after_render: async () => {
        (document.getElementById('navbar-search') as HTMLInputElement).focus();
        (document.getElementById('navbar-search') as HTMLInputElement).select();
    },
};

export default HomePage;
