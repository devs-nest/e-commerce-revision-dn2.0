import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { StarRating } from '../components/start-rating';
import { ACTION, useDispatch, } from '../store';
import { useDispatch as reduxUseDispatch, useSelector } from 'react-redux';
import "./home.css"
import { fetchAllProducts } from '../feature/product-slice';
import { addToCart } from '../feature/cart-slice';


function Home() {
    const [searchParams,] = useSearchParams();
    const selectedCategory = searchParams.get("category");
    const searchTerm = searchParams.get("searchterm");
    const dispatch = useDispatch();
    const reduxDispatch = reduxUseDispatch();
    const { value: products, loading } = useSelector(state => state.products);
    console.log({ products });


    let filteredProducts = selectedCategory ? products.filter(prod => prod.category === selectedCategory) : products;
    filteredProducts = searchTerm ? filteredProducts.filter(prod => prod.title.toLowerCase().includes(searchTerm.toLowerCase())) : filteredProducts;
    const filteredCategories = Array.from(new Set(filteredProducts?.map(prod => prod.category)));
    console.log(filteredCategories);

    // async function fetchAllProducts() {

    //     const result = await fetch('https://fakestoreapi.com/products');
    //     dispatch({ type: ACTION.ADD_PRODUCTS, payload: await result.json() });
    //     console.log("re-render triggered", products);
    // }
    if (!products?.length) {
        reduxDispatch(fetchAllProducts());
    }
    // async function fetchProductsByCategory(category) {

    //     const result = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    //     setProducts(await result.json())
    //     console.log("re-render triggered", products);
    // }
    // useEffect(() => {

    //     selectedCategory === "all" ? fetchAllProducts() : fetchProductsByCategory(selectedCategory);
    // }, [selectedCategory])




    // category: "men's clothing"
    // description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
    // id: 1
    // image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    // price: 109.95
    // rating: { rate: 3.9, count: 120 }
    // title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"


    return (loading ? "loading..." : <div>
        {filteredCategories?.length ? filteredCategories?.map(category => (<Category key={category} title={category}>
            {filteredProducts.filter(prod => prod.category === category)?.map(prod => <Product key={prod.id} product={prod} />)}
        </Category>)) : "No Products Found"}
    </div>
    )
}



function Category({ title, children }) {
    return <div className="category">
        <h2 className='category__title'>{title}</h2>
        <div className='category__row'>{children}</div>
    </div>
}

function Product({ product }) {
    const { image, title, rating, price } = product;
    const dispatch = useDispatch();
    const reduxDispatch = reduxUseDispatch();
    const addProductToCart = () => {
        dispatch({ type: ACTION.ADD_TO_CART, payload: { product } })
        reduxDispatch(addToCart({ product, quantity: 1 }))
    }
    return (<div className='product'>
        <img src={image} alt={title} loading="lazy" />
        <div className='product__info'>

            <h3 className='product__title lineclamp'>{title}</h3>
            <StarRating rating={rating} />
            <p>
                <strong>$</strong> {price}
            </p>
            <p className='product__add' onClick={addProductToCart}>
                <button>Add to cart</button>
            </p>
        </div>
    </div>)
}

export default Home