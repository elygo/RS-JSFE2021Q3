const TreePage = {
    render: async (): Promise<string> => {
        return `
        <section>
            <h1>Tree</h1>
        </section>`;
    },
    after_render: async (): Promise<void> => {},
};

export default TreePage;
