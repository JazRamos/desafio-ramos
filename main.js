class ProductManager{ 
    constructor(path){
    this.path = path;
}

    addProducts(title = 'producto prueba', description = 'esto es un producto prueba', price = 200, thumbnail, code ='abc1', stock =25 ){
        const prod = {
            id: this.getProductById() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(prod);
    }
    getProductById() {
        let prodId = 0;
        this.products.map((prod) => {
            if (prod.id > prodId) prodId = prod.id;
        });
        return prodId;
    }

    getProducts() {
        return this.products;
    }
}
