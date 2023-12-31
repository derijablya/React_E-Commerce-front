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
      const response = await fetch(
        "http://localhost:8080/item/",
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Access-Control-Allow-Origin": "f849-31-155-17-143.ngrok-free.app",
          },
        }
      );
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
      await fetch("http://localhost:8080/item/", {
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
      await fetch(`http://localhost:8080/item/${productId}`, {
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
      <button onClick={openAddModal} className="btn-add">Add Product</button>

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
            <div className="add-product-button">
              <button type="submit">Add Product</button>
            </div>
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
              <img
                src={product.image}
                alt={product.name}
                className="product-img"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="shop-id">
                Shop ID:<br></br> {product.shop_id}
              </p>
              <p className="category-id">
                Category ID:<br></br> {product.category_id}
              </p>
              <p className="product-price">
                Price:<br></br> {product.price}
              </p>
              <p className="product-description">
                <b>Description:</b>
                <br></br> {product.description}
              </p>
              <div className="button-container">
                <button
                  className="product-button btn btn-outline-dark m-2 btn-edit"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="product-button btn btn-outline-dark m-2 btn-delete"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCRUD;
