import {CartIconContainer,ShoppingIcon,ItemCount} from  './cart-icon.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';



const CartIcon = () => {

    const {setIsCartOpen,cartCount} = useContext(CartContext);


    const toggleIsCartOpen = () => {
        setIsCartOpen((previousState) => !previousState);
    }

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
           <ShoppingIcon /> 
           <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )

}
export default CartIcon;