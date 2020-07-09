import "./scss/index.scss";

import React, { useContext } from "react";
import { Redirect } from "react-router";

import { useUserDetails } from "@saleor/sdk";

import { Offline, OfflinePlaceholder, Online, OverlayContext } from "..";

import CheckoutAsGuest from "./CheckoutAsGuest";
import SignInForm from "./SignInForm";
import { OverlayType, OverlayTheme } from "../Overlay";

const CheckoutLogin: React.FC<{}> = () => {
  const overlay = useContext(OverlayContext);
  const { show } = overlay;
  const { data: user } = useUserDetails();

  const showPasswordResetOverlay = () => {
    show(OverlayType.password, OverlayTheme.right);
  };

  if (user) {
    return <Redirect to="/checkout/" />;
  }
  return (
    <div className="container">
      <Online>
        <div className="checkout-login">
          <CheckoutAsGuest overlay={overlay} checkoutUrl="/checkout/" />
          <div className="checkout-login__user">
            <SignInForm onClick={showPasswordResetOverlay} />
          </div>
        </div>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </div>
  );
};

export default CheckoutLogin;
