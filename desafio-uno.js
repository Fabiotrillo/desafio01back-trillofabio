class ProductManager {
    constructor() {
        this.products = [];
    }

    static id = 0

    addProduct(title, description, price, img, code, stock) {

        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.log('Error: El código ya está en uso.');

        } else {
            ProductManager.id++;
            this.products.push({
                title,
                description,
                price,
                img,
                code,
                stock,
                id: ProductManager.id
            });
        }
    }
    getProduct() {
        return this.products;
    }

    existe(id){
        return this.products.find((producto) => producto.id === id)
    }

    getProductById(id) {
        !this.existe(id) ? console.log("Error al obtener ID") : console.log(this.existe(id))
        
    }
}

const manager = new ProductManager

//llamamos al arreglo vacio 
console.log(manager.getProduct());

//agregamos productos
manager.addProduct('product1', 'description product 1', 50, './img/product1.jpg', 'abc123', 2);
manager.addProduct('product2', 'description product 2', 40, './img/product1.jpg', 'xjf203', 5)

//llamamos al arreglo para ver los productos agregados
console.log(manager.getProduct());

//verificacion codigo repetido  
manager.addProduct('product3', 'description product 3', 80, './img/product1.jpg', 'xjf203', 5)

//verificar ID
manager.getProductById(3);

//verificacion ID no encontrado
manager.getProductById(4);


//Agregamos producto con faltante en un campo obligatorio
manager.addProduct('', 'Descripción', 10, 'imagen.jpg', 'abc123', 5);