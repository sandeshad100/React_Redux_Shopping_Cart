import React from "react";
import Header from "./Header";
import Products from "./Products";
import "./Layout.css";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";
const Layout = () => {
  const showCart = useSelector((state) => state.cart.showCart);
  // const cartItems = useSelector((state) => state.cart.itemsLists);
  // console.log(cartItems);
  const cartItems = useSelector((state) => state.cart.itemsList);
  console.log(cartItems);
  var total = 0;
  cartItems.forEach((element) => {
    total += element.totalPrice;
  });
  console.log(total);

  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <Products />
        {showCart && <CartItems />}
        <div className="total-price">
          <h3>Total: ${total}</h3>
          <button className="orderBtn">Place Order</button>
        </div>{" "}
      </div>
    </React.Fragment>
  );
};

export default Layout;
