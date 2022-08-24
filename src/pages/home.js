import React, { useEffect, useState } from 'react'
import "./home.css"


function Home() {
    let text = "Home";
    let [products, setProducts] = useState([]);
    console.log("we are inside home");
    console.log("products", products);
    console.log({ text });
    async function fetchProducts() {

        const result = await fetch('https://fakestoreapi.com/products');
        setProducts(await result.json())
        console.log("re-render triggered", products);
    }
    useEffect(() => {
        console.log("use effect called");
        fetchProducts();
        text = "Updated text"
        console.log({ text });
    }, [])

    useEffect(() => {
        console.log("products updated", products)
    }, [products])


    // category: "men's clothing"
    // description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
    // id: 1
    // image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    // price: 109.95
    // rating: { rate: 3.9, count: 120 }
    // title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"


    return (
        <div className='product__rows'>{products?.length ? products.map(prod =>
            <Product key={prod.id} product={prod} />) : "No products found"}</div>

    )
}

const StarRating = ({ rating }) => Array(Math.round(rating)).fill(0).map(rating => <span>⭐️</span>)

function Product({ product }) {
    const { image, title, rating, price } = product;
    return (<div className='product'>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p><StarRating rating={rating.rate} /> out of {rating.count} ratings</p>
        <p>
            <strong>$</strong> {price}
        </p>
    </div>)
}

export default Home