import { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from "../../assets/assets";
import Footer from '../../components/Footer/Footer';
// import { assets } from "../../../../admin/src/assets/assets"
const Cart = () => {
  const { cartItems, foodList,url, addToCart, removeFromCart, getTotalAmount, removeItem } = useContext(StoreContext);
  const navigate = useNavigate();
  const isCartEmpty = Object.values(cartItems).every(quantity => quantity === 0);

  return (
    <>
      <div className="cart">
        <div className="cart-items">
          {isCartEmpty ? (
            <div className="cart-empty-message">
              <p>Your Cart is empty!</p>
            </div>
          ) : (
            <>
              {foodList.map((item, index) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <div className="cart-item" key={index}>
                      <div className="product">
                        <img src={url+"/images/"+item.image} alt="" />
                        <p>{item.name}</p>
                      <p>${item.price}</p>
                      </div>
                      <div className="cart-item-counter">
                        <img
                          onClick={() => removeFromCart(item._id)}
                          src={assets.remove_icon_red}
                          alt="decrement"
                        />
                        <p>{cartItems[item._id]}</p>
                        <img
                          onClick={() => addToCart(item._id)}
                          src={assets.add_icon_green}
                          alt="increment"
                        />
                      </div>
                      <p>${item.price * cartItems[item._id]}</p>
                      <p onClick={() => removeItem(item._id)} className="cross">
                        <i className="fas fa-trash-alt del"></i>
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </>
          )}
        </div>
      </div>
      {!isCartEmpty && (
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery</p>
                <p>${getTotalAmount() > 0 ? "2" : "0"}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalAmount() > 0 ? getTotalAmount() + 2 : 0}</b>
              </div>
              <button className="btn-class" onClick={() => navigate('/order')}>Proceed To Checkout</button>
            </div>
          </div>
          <div className="cart-promoCode">
            <p>If you have any promo code, enter here</p>
            <div className="promo-input">
              <input type="text" placeholder='Enter Promo Code' />
              <button className="promo-btn">Apply</button>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
}

export default Cart;
