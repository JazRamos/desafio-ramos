const fs = require("fs");
class ProductManager {
    constructor(path) {
        this.path = path;
    }
    async addProducts(title, description, price, thumbnail, code, stock) {
        const prod = {
            id: this.getId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.path.push(prod);
    }
    getId() {
        let prodId = 0;
        this.products.map((prod) => {
            if (prod.id > prodId) prodId = prod.id;
        });
        return prodId;
    }
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(products);
            } else {
                return this.path;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(productId) {
        const products = await this.getProducts();
        const product = products.find(product => product.id === productId);
        if (product) {
            return product;
        } else {
            console.log('no existe este prod')
        }
    }

    async updateProduct(product) {
        try {
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log('Nuevo producto agregado')
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(productId) {
        const products = await this.getProducts();
        const product = products.splice(product => product.id !== productId);
        await fs.promises.writeFile(path, JSON.stringify(product));
        console.log("El producto fue eliminado");


    }
}


const prodManager = new ProductManager("./products.json")
const prod1 = {
    id: 1,
    title: "Lapicera Bic Round Stic Azul x12u",
    description: "Caja por 12 unidades de lapiceras Bic línea Round Stic, color azul, trazo grueso.",
    price: 3945,
    thumbnail: "https: //res.cloudinary.com/diklj3m6q/image/upload/v1705344747/lapicera1_l3pehr.png",
    code: "1",
    stock: 10
};

const prod2 = {
    id: 2,
    title: "Lapiceras Bic Colores Cristal x10u",
    description: "Lapiceras Bic línea Cristal por 10 dolores surtidos, trazo grueso.",
    price: 7600,
    thumbnail: "https: //res.cloudinary.com/diklj3m6q/image/upload/v1705344747/lapicera2_k7isxg.png",
    code: "2",
    stock: 10
};

const test = async () => {
   
    console.log(await prodManager.getProducts());
    prodManager.addProducts(prod1);
    prodManager.addProducts(prod2);
    console.log(await prodManager.getProducts());
    console.log(await prodManager.getProductById(1));
    console.log(await prodManager.getProductById(6));
    await prodManager.updateProduct(1, "stock", 2);
    await prodManager.updateProduct(2, "price", 50000);
    //await prodManager.deleteProduct(1);
}

test();