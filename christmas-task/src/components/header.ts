const Header = {
    render: async () => {
        return `
             <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
                        <div class="navbar-start">
                            <a class="navbar-item" href="/#/">
                                Home
                            </a>
                            <a class="navbar-item" href="/#/toys">
                                Toys
                            </a>
                            <a class="navbar-item" href="/#/tree">
                                Tree
                            </a>
                        </div>
                        <div class="navbar-end">
                            <a class="navbar-item" href="/#/">
                                Home
                            </a>
                        </div>
                    </div>
            </nav>
        `;
    },
    after_render: async () => {},
};

export default Header;
