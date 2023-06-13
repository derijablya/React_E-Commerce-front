import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "./ProductCRUD.css";

const ProductCRUD = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        shop_id: 0,
        category_id: 0,
        price: 0.0,
        description: "",
        image: null,
    });
    const [editProduct, setEditProduct] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/item/");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            image: file,
        }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", newProduct.name);
            formData.append("shop_id", newProduct.shop_id);
            formData.append("category_id", newProduct.category_id);
            formData.append("price", newProduct.price);
            formData.append("description", newProduct.description);
            formData.append("image", newProduct.image);
            await fetch("/api/products", {
                method: "POST",
                body: formData,
            });
            fetchProducts();
            setNewProduct({
                name: "",
                shop_id: 0,
                category_id: 0,
                price: 0.0,
                description: "",
                image: null,
            });
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleEditProduct = (product) => {
        setEditProduct(product);
        setNewProduct({
            name: product.name,
            shop_id: product.shop_id,
            category_id: product.category_id,
            price: product.price,
            description: product.description,
            image: null,
        });
        setIsEditModalOpen(true);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", newProduct.name);
            formData.append("shop_id", newProduct.shop_id);
            formData.append("category_id", newProduct.category_id);
            formData.append("price", newProduct.price);
            formData.append("description", newProduct.description);
            formData.append("image", newProduct.image);
            await fetch(`/api/products/${editProduct.id}`, {
                method: "PUT",
                body: formData,
            });
            fetchProducts();
            setEditProduct(null);
            setNewProduct({
                name: "",
                shop_id: 0,
                category_id: 0,
                price: 0.0,
                description: "",
                image: null,
            });
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await fetch(`/api/products/${productId}`, {
                method: "DELETE",
            });
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div className="product-crud">
            <h2>Product CRUD</h2>

            {/* Add Product Button */}
            <button onClick={openAddModal}>Add Product</button>

            {/* Add Product Modal */}
            {isAddModalOpen && (
                <Modal onClose={closeAddModal}>
                    <h3>Add Product</h3>
                    <form onSubmit={handleAddProduct}>
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                        />
                        <input
                            type="number"
                            name="shop_id"
                            value={newProduct.shop_id}
                            onChange={handleInputChange}
                            placeholder="Shop ID"
                        />
                        <input
                            type="number"
                            name="category_id"
                            value={newProduct.category_id}
                            onChange={handleInputChange}
                            placeholder="Category ID"
                        />
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            placeholder="Price"
                        />
                        <textarea
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                        ></textarea>
                        <input type="file" name="image" onChange={handleImageChange} />
                        <button type="submit">Add Product</button>
                    </form>
                </Modal>
            )}

            {/* Edit Product Modal */}
            {isEditModalOpen && (
                <Modal onClose={closeEditModal}>
                    <h3>Edit Product</h3>
                    <form onSubmit={handleUpdateProduct}>
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                        />
                        <input
                            type="number"
                            name="shop_id"
                            value={newProduct.shop_id}
                            onChange={handleInputChange}
                            placeholder="Shop ID"
                        />
                        <input
                            type="number"
                            name="category_id"
                            value={newProduct.category_id}
                            onChange={handleInputChange}
                            placeholder="Category ID"
                        />
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            placeholder="Price"
                        />
                        <textarea
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                        ></textarea>
                        <input type="file" name="image" onChange={handleImageChange} />
                        <button type="submit">Update Product</button>
                    </form>
                </Modal>
            )}

            {/* Product List */}
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id}>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>Shop ID: {product.shop_id}</p>
                            <p>Category ID: {product.category_id}</p>
                            <p>Price: {product.price}</p>
                            <p>Description: {product.description}</p>
                            <button onClick={() => handleEditProduct(product)}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)}>
                                Delete
                            </button>
                        </div>
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductCRUD;
