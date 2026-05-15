const fs = require('fs');

const [command, ...args] = process.argv.slice(2);

const readFromProducts = () => {
    try {
        const data = fs.readFileSync('./productsData.json', 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (err) {
        return [];
    }
}

const list = () => {
    const Products = readFromProducts();
    console.log(Products);
}

const WriteToProductsFile = (products) => {
    try {
        fs.writeFileSync(
            "./productsData.json",
            JSON.stringify(products, null, 2)
        );
    } catch (err) {
        console.log("Error writing file:", err.message);
    }
};

const addProduct = (nme, pric) => {
    try {
        if (!nme || !pric) {
            console.log("Please provide name and price");
            return;
        }
        const allProducts = readFromProducts();
        const newProduct = {
            id: Date.now(),
            name: nme,
            price: Number(pric),
        };

        allProducts.push(newProduct);
        WriteToProductsFile(allProducts);

        console.log("Product added successfully");
    } catch (err) {
        console.log("Error creating product:", err.message);
    }
}

const updateProductt = (id, name, price) => {
    try {
        const allproducts = readFromProducts();

        const productIndex = allproducts.findIndex(product => product.id === Number(id));

        if (productIndex === -1) {
            console.log("Product not found");
            return;
        }

        if (name) {
            allproducts[productIndex].name = name;
        }

        if (price) {
            allproducts[productIndex].price = Number(price);
        }

        WriteToProductsFile(allproducts);

        console.log("Product updated successfully");
    } catch (err) {
        console.log(err.message);
    }
};

const updateProduct = (id, newName) => {
    try {
        if (!id || !newName) {
            console.log("Please provide id and new name");
            return;
        }
        const allproducts = readFromProducts();
        const productIndex = allproducts.findIndex(product => product.id === Number(id))
        if (productIndex != -1) {
            allproducts[productIndex].name = newName;
            WriteToProductsFile(allproducts)
            console.log("Product updated successfully");
        } else {
            console.log("product Not Found");
        }
    } catch (err) {
        console.log(err.message);

    }

}

const deleteProduct = (id) => {
    try {
        let allproducts = readFromProducts();
        let filtered = allproducts.filter(product => product.id !== Number(id))
        if (filtered.length === allproducts.length) {
            console.log("Product not found");
        } else {
            WriteToProductsFile(filtered);
            console.log("Product deleted successfully");
        }
    } catch (err) {
        console.log(err.message);
    }
}

switch (command) {
    case 'list':
        list();
        break;
    case 'add':
        addProduct(args[0], args[1]);
        break;
    case 'update':
        const id = args[0];
        let newName;
        let newPrice;
        for (let i = 1; i < args.length; i++) {
            if (args[i] === '--name') {
                newName = args[i + 1];
            }

            if (args[i] === '--price') {
                newPrice = args[i + 1];
            }
        }
        if (!newName && !newPrice) {
            newName = args[1];
        }
        updateProductt(id, newName, newPrice);
        break;
    case 'delete':
        deleteProduct(args[0])
        break;
    default:
        console.log("Unknown command");
}
