import { promises as fs } from "fs";



class ProductManager {
    constructor() {
        this.patch = "./productos.json";
        this.products = [];
    }

    static id = 0

    addProduct = async (title, description, price, img, code, stock, id) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct);
        
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    }

    readProducts = async ()=>{
        try {
            let rta = await fs.readFile(this.patch, "utf-8");
            return JSON.parse(rta)
        } catch (error) {
            console.log("Error reading file:", error.message);
            return [];
        }
    }

    getProducts = async ()=>{
        let rta2 = await this.readProducts();
        return console.log(rta2)
    }

    exist(id, productList){
        return productList.find((producto) => producto.id === id)
    }

    getProductsByID = async (id) =>{
        let products = await this.readProducts();
        let product = this.exist(id, products);
        !product ? console.log("Error al obtener ID") : console.log(product);
    }

    deleteProductByID = async (id) => {
        let rta3 = await this.readProducts();
        let productFilter = rta3.filter(products => products.id != id);
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Delete product");
    }

    upgradeProduct = async ({id, ...product}) =>{
       await this.deleteProductByID(id);
       let productOld = await this.readProducts();
       let productMod = [{...product, id}, ...productOld];
       await fs.writeFile(this.patch, JSON.stringify(productMod));

    }

}

// const manager = new ProductManager

// manager.addProduct('product1', 'description product 1', 80, './img/product1.jpg', 'xjf203', 5)
// manager.addProduct('product2', 'description product 2', 120, './img/product2.jpg', '123abc', 10)
// manager.addProduct('product3', 'description product 3', 160, './img/product3.jpg', 'jxp101', 15)
// manager.addProduct('product4', 'description product 4', 90, './img/product4.jpg', 'xyz456', 8)
// manager.addProduct('product5', 'description product 5', 110, './img/product5.jpg', 'abc789', 12)
// manager.addProduct('product6', 'description product 6', 140, './img/product6.jpg', 'lmn012', 20)
// manager.addProduct('product7', 'description product 7', 75, './img/product7.jpg', 'pqr345', 7)
// manager.addProduct('product8', 'description product 8', 100, './img/product8.jpg', 'def678', 18)
// manager.addProduct('product9', 'description product 9', 130, './img/product9.jpg', 'ghi901', 25)
// manager.addProduct('product10', 'description product 10', 95, './img/product10.jpg', 'uvw234', 13)

//manager.getProducts()

// manager.getProductsByID(5)

 //manager.deleteProductByID(2)

/*manager.upgradeProduct({
    title: 'product3',
    description: 'description product 3',
    price: 200,
    img: './img/product3.jpg',
    code: 'jxp101',
    stock: 15,
    id: 3
})*/


export default ProductManager;