const Footer = {
    render: async () => {
        return `
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                   Developed by Elyor Farmonov (RSSchool) 2021
                </p>
            </div>
        </footer>
        `;
    },
    after_render: async () => {},
};

export default Footer;
