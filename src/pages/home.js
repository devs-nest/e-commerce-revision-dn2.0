import React, { useEffect, useState } from 'react'
import { useSelector } from '../store';
import "./home.css"


function Home() {
    const selectedCategory = useSelector(state => state.selectedCategory);
    let [products, setProducts] = useState([]);
    const filteredCategories = Array.from(new Set(products?.map(prod => prod.category)));
    console.log(filteredCategories);

    async function fetchAllProducts() {

        const result = await fetch('https://fakestoreapi.com/products');
        setProducts(await result.json())
        console.log("re-render triggered", products);
    }
    async function fetchProductsByCategory(category) {

        const result = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        setProducts(await result.json())
        console.log("re-render triggered", products);
    }
    useEffect(() => {

        selectedCategory === "all" ? fetchAllProducts() : fetchProductsByCategory(selectedCategory);
    }, [selectedCategory])




    // category: "men's clothing"
    // description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
    // id: 1
    // image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    // price: 109.95
    // rating: { rate: 3.9, count: 120 }
    // title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"


    return (<div>
        {filteredCategories?.length ? filteredCategories?.map(category => (<Category key={category} title={category}>
            {products.filter(prod => prod.category === category)?.map(prod => <Product key={prod.id} product={prod} />)}
        </Category>)) : "No Products Found"}
    </div>
    )
}

const StarRating = ({ rating }) => Array(Math.round(rating)).fill(0).map(rating => <span>⭐️</span>)

function Category({ title, children }) {
    return <div className="category">
        <h2 className='category__title'>{title}</h2>
        <div className='category__row'>{children}</div>
    </div>
}

function Product({ product }) {
    const { image, title, rating, price } = product;
    return (<div className='product'>
        <img src={image} alt={title} loading="lazy" />
        <div className='product__info'>

            <h3 className='product__title lineclamp'>{title}</h3>
            <p><StarRating rating={rating.rate} /> out of {rating.count} ratings</p>
            <p>
                <strong>$</strong> {price}
            </p>
        </div>
    </div>)
}

export default Home