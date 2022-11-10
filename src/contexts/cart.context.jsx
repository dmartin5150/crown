import { createContext, useState } from "react";



const addCartItem = (cartItems, productToAdd) => {


    const existingCartItem = cartItems.find((item)=> item.id === productToAdd.id)

    if (existingCartItem){
        const newItems = cartItems.map((cartItem)=> cartItem.id === productToAdd.id ? 
        {...cartItem, quantity:cartItem.quantity + 1} :
        {cartItem});
        console.log('new', newItems);
        return newItems;
    }


    return[...cartItems, {...productToAdd, quantity:1}];

}


export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen: ()=>{},
    cartItems:[],
    addItemToCart:()=>{}
});



export const CartProvider = ({children}) => {
    // const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart,cartItems};

    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>);

}
