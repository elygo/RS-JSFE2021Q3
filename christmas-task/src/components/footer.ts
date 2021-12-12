const Footer = {
    render: async () => {
        return `
        <footer class="footer">
            <div class="content has-text-centered">
                <a href="https://github.com/elygo">
                   Developed by Elyor Farmonov
                </a>
                <a href="https://rs.school/"><div class="logo"></div></a>
            </div>
        </footer>
        `;
    },
    after_render: async () => {},
};

export default Footer;
