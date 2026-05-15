import express from "express";
import fs from "fs/promises";

const app = express();
app.use(express.json());


const readProducts = async () => {
    try {
        const data = await fs.readFile("./products.json", "utf-8");
        return data ? JSON.parse(data) : []
    } catch (err) {
        return [];
    }
}

const writeProducts = async (products) => {
    await fs.writeFile("./products.json", JSON.stringify(products, null, 2));
};


// CREATE
const createProduct = (name, price) => {
    return { id: Date.now(), name, price };
};

// GET ALL
const getAllProducts = async () => {
    return await readProducts();
};

//GET PRODUCT BY ID
const getProductById = async (id) => {
    const products = await readProducts();
    return products.find(prd => prd.id == id)
}


const addProduct = async (name, price) => {
    const products = await readProducts();
    const product = createProduct(name, price);
    products.push(product);
    await writeProducts(products);
    return product;
};


// UPDATE by patch
const replaceProduct = async (id, newData) => {
    const products = await readProducts();
    const index = products.findIndex((p) => p.id == id);

    if (index === -1) return null;

    const updatedProduct = { id, ...newData };

    products[index] = updatedProduct;

    await writeProducts(products);

    return updatedProduct;
};

// UPDATE by put
const updateProduct = async (id, newData) => {
    const products = await readProducts();
    const index = products.findIndex((p) => p.id == id);

    if (index === -1) return null;

    products[index] = { ...products[index], ...newData };
    await writeProducts(products);
    return products[index];
};


const deleteProduct = async (id) => {
    const products = await readProducts();
    const index = products.findIndex((p) => p.id == id);

    if (index === -1) return null;

    const deleted = products.splice(index, 1);
    await writeProducts(products);
    return deleted[0];
};

// GET ALL
app.get("/products", async (req, res) => {
    const products = await getAllProducts();
    return res.status(200).json({
        success: true,
        data: products,
    });
});

// GET ONE
app.get("/products/:id", async (req, res) => {
    const product = await getProductById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    return res.status(200).json({
        success: true,
        data: product,
    });
});


// CREATE
app.post("/products", async (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({
            success: false,
            message: "Name and price are required",
        });
    }

    const product = await addProduct(name, price);

    return res.status(201).json({
        success: true,
        data: product,
    });
});

// PATCH 
app.patch("/products/:id", async (req, res) => {
    const newData = req.body;

    if (!newData || Object.keys(newData).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Data is required to update",
        });
    }

    const updated = await replaceProduct(req.params.id, newData);

    if (!updated) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    return res.status(200).json({
        success: true,
        data: updated,
    });
});


//PUT
app.put("/products/:id", async (req, res) => {
    const newData = req.body;

    if (!newData || Object.keys(newData).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Data is required to update",
        });
    }

    const updated = await updateProduct(req.params.id, newData);

    if (!updated) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    return res.status(200).json({
        success: true,
        data: updated,
    });
})


// DELETE
app.delete("/products/:id", async (req, res) => {
    const deleted = await deleteProduct(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    return res.status(200).json({
        success: true,
        data: deleted,
    });
});

/* ================= SERVER ================= */

app.listen(5000, () => {
    console.log("Server running on port 5000");
});