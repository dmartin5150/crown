
import { clearItemFromCart,addItemToCart,removeItemFromCart } from "../../store/cart/cart.action";
import { useSelector,useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {FC} from 'react';
import { CartItem } from "../../store/cart/cart.types";

import {
  CheckoutItemContainer,
  ImageContainer,
  RemoveButton,
  BaseSpan,
  Quantity,
  Value,
  Arrow,
} from "./checkout-item.styles";

type CheckOutItemProps = {
  cartItem:CartItem;
}

const CheckoutItem:FC<CheckOutItemProps> = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};
export default CheckoutItem;
