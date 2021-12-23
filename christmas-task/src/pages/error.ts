const ErrorPage = {
    render: async (): Promise<string> => {
        return `
        <section>
            <h1>Error</h1>
        </section>`;
    },
    after_render: async (): Promise<void> => {},
};

export default ErrorPage;
