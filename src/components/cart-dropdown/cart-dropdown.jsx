import "./cart-dropdown.styles.scss";
import { useContext } from "react";
import Button from "../button/button";
import CartItem from "../cart-item/cart-item";
import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {

    const {cartItems} = useContext(CartContext);

  console.log('cart items:', cartItems);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => <CartItem  key={item.id} cartItem={item} />)}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};
export default CartDropdown;
