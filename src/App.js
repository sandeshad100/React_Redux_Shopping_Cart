import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
var isFirstRender = true;
function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Requests",
          type: "warning",
        })
      );

      const res = await fetch(
        "https://react-redux-f1b58-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      //Send state as Request is successful
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Send request to Database Successfully",
          type: "success",
        })
      );
    };
    sendRequest().catch((err) => {
      //send state as Error
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request Failed",
          type: "error",
        })
      );
    });
  }, [cart]);

  return (
    <div className="App">
      <Notification type={notification?.type} message={notification?.message} />
      {isLoggedIn ? <Layout /> : <Auth />}
      {/* <Auth />   */}
      {/* <Layout /> */}
    </div>
  );
}

export default App;
