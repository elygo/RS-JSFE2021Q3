const Header = {
    render: async () => {
        return `
             <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="container">
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
                    </div>
                </div>
            </nav>
        `;
    },
    after_render: async () => {},
};

export default Header;
