import {CartIconContainer,ShoppingIcon,ItemCount} from  './cart-icon.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';



const CartIcon = () => {

    const {setIsCartOpen,cartCount, isCartOpen} = useContext(CartContext);


    const toggleIsCartOpen = () => {
        console.log('toggleIsCartOpen');
        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
           <ShoppingIcon /> 
           <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )

}
export default CartIcon;