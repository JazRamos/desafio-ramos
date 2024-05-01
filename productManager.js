const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProducts(title, description, price, thumbnail, code, stock) {
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
    getId() {
        let prodId = 0;
        this.products.map((prod) => {
            if (prod.id > prodId) prodId = prod.id;
        });
        return prodId;

    }
    getProductById(productId) {
        return this.products.find(product => product.id === productId);
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(products);
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }


    updateProduct() {

    }

    deleteProduct() {

    }
}




const prodManager = new ProductManager("./products.json")