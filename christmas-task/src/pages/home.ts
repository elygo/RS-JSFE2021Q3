const HomePage = {
    render: async () => {
        return `
        <section class="home">
            <div class="home__title-container">
                <div class="home__title">Помогите бабушке нарядить елку</div>
            </div>
            <div class="home__start-container">
                <div class="home__start">Начать</div>
            </div>
            
        </section>`;
    },
    after_render: async () => {},
};

export default HomePage;
