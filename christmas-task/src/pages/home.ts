const HomePage = {
    render: async () => {
        return `
        <section class="home">
            <div class="home__title-container">
                <div class="home__title">Помогите бабушке нарядить елку</div>
            </div>
            <button class="home__start" onclick="location.href='/#/toys'" type="button">Начать</button>            
        </section>`;
    },
    after_render: async () => {},
};

export default HomePage;
