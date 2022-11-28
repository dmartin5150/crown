import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import {NavigationContainer, LogoContainer,NavLinks,NavLink} from "./navigation.styles";
import { useSelector,useDispatch } from "react-redux";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
// import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { setCurrentUser } from "../../store/user.action";
import { selectCurrentUser } from "../../store/user.selector";

const Navigation = () => {
  const dispatch = useDispatch();
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  const currentUser = useSelector(selectCurrentUser);

  const signOutHandler = async () => {
    const res = await signOutUser();
    dispatch(setCurrentUser(null));
  };


  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
