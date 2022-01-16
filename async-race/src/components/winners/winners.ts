class Winners {
    url = 'http://127.0.0.1:3000';
    async show() {
        const response = await fetch(this.url + '/winners');
        const data = await response.json();
    }
}

export default Winners;
