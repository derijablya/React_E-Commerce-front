import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";

const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    let componentMounted = true;

    const dispatch = useDispatch();

    const addProduct = (product) => {
        dispatch(addCart(product));
    };

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("http://localhost:8080/item/");
            const responseData = await response.json();
            if (componentMounted) {
                setData(responseData);
                setFilter(responseData);
                setLoading(false);
            }
        };

        getProducts();

        return () => {
            componentMounted = false;
        };
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/category/"); // Replace API_URL with the actual URL of the categories API
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-12 py-5 text-center">
                    <Skeleton height={40} width={560} />
                </div>
                {Array(6)
                    .fill()
                    .map((_, index) => (
                        <div
                            className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
                            key={index}
                        >
                            <Skeleton height={592} />
                        </div>
                    ))}
            </>
        );
    };

    const filterProduct = (cat) => {
        const updatedList = data.filter((item) => item.category_id === cat);
        setFilter(updatedList);
    };

    const ShowProducts = () => {
        if (!Array.isArray(filter)) {
            throw new Error("Filter should be an array");
        }

        return (
            <>
                <div className="buttons text-center py-5">
                    <button
                        className="btn btn-outline-dark btn-sm m-2"
                        onClick={() => setFilter(data)}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            className="btn btn-outline-dark btn-sm m-2"
                            onClick={() => filterProduct(category.id)}
                            key={category.id}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {filter.map((product) => {
                    return (
                        <div
                            id={product.id}
                            key={product.id}
                            className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
                        >
                            <div className="card text-center h-100" key={product.id}>
                                <img
                                    className="card-img-top p-3"
                                    src={product.image}
                                    alt="Card"
                                    height={300}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {product.name.substring(0, 12)}...
                                    </h5>
                                    <p className="card-text">
                                        {product.description.substring(0, 90)}...
                                    </p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item lead">$ {product.price}</li>
                                </ul>
                                <div className="card-body">
                                    <Link to={"/product/" + product.id} className="btn btn-dark m-1">
                                        Buy Now
                                    </Link>
                                    <button
                                        className="btn btn-dark m-1"
                                        onClick={() => addProduct(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };

    return (
        <>
            <div className="container my-3 py-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="display-5 text-center">Special For You</h2>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </>
    );
};

export default Products;
