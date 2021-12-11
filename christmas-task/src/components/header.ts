const Header = {
    render: async () => {
        return `
             <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

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
