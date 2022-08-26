import React from 'react'
import { useNavigate } from 'react-router-dom';
import { StarRating } from '../components/start-rating';
import { ACTION, useDispatch, useSelector } from '../store';
import { getItemCount, getSubtotal } from '../utils';
import "./cart.css";
function Cart() {
  const cartItems = useSelector(state => state.cart);
  const itemCount = getItemCount(cartItems);
  const subTotal = getSubtotal(cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const proceedToCheckout = () => {
    navigate("/checkout");
  }
  const handleQuantityChange = (e, { product, quantity }) => {
    const updatedQuantity = e.target.value;
    if (updatedQuantity < quantity) {
      //reducing the quantity
      dispatch({ type: ACTION.REMOVE_FROM_CART, payload: { product } })
    } else {
      dispatch({ type: ACTION.ADD_TO_CART, payload: { product } })
    }
  }
  return (
    <div className='cart'>
      <section className='cart__items'>
        <h2>Shopping Cart</h2>
        {cartItems?.map(({ product, quantity }) => {
          const { title, price, rating, image, id } = product;
          return <><div className='cart__item'>
            <section>
              <img loading='lazy' src={image} />
            </section>
            <section>
              <h3>{title}</h3>
              <StarRating rating={rating} />
              <div className='cart__item__quantity'>
                <label htmlFor={`$quantity_{id}`}>Qty</label>
                <input min={0} max={10} type="number" name={`$quantity_{id}`} id={`$quantity_{id}`} value={quantity} onChange={(e) => handleQuantityChange(e, { product, quantity })} />
              </div>
            </section>
            <section className='cart__items__price'>
              <small>$</small><strong>{getSubtotal([{ product, quantity }])}</strong>
            </section>
          </div>

            <hr />
          </>
        })}
      </section>
      <section className='cart__subtotal'>
        <h2>Subtotal</h2>
        {subTotal}
        <p>
          <button onClick={proceedToCheckout}>Buy now</button>
        </p>
      </section>

    </div>
  )
}

export default Cart