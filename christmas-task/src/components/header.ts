const Header = {
    render: async () => {
        return `
             <nav class="navbar" role="navigation" aria-label="main navigation">
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
                        <div class="navbar-center"></div>
                        <div class="navbar-end">
                            <input type="search" id="navbar-search" autocomplete="off" placeholder="Введите текст...">
                            <div class="item-counter"><span id="item-counter">0</span></div>
                        </div>
            </nav>
        `;
    },
    after_render: async () => {},
};

export default Header;
