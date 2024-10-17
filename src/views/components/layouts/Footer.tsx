import React, { memo } from "react";
import { Link } from "react-router-dom";
import "assets/styles/components/Footer.scss";
import RouterPath from "routers/routesContants";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__row">
        <div className="logo">
          <Link to={RouterPath.BASE_URL} className="logo-link">
            <h5 className="logo-title">lawyer.app</h5>
          </Link>
        </div>
      </div>
      <div className="footer__row">
        <p className="footer__text">
          © 2024 <b>lawyer.app</b>
        </p>
        <Link to={RouterPath.BASE_URL} className="footer__text footer-link">
          <p>Privacy Policy</p>
        </Link>
        <Link to={RouterPath.BASE_URL} className="footer__text footer-link">
          <p>Refund Policy</p>
        </Link>
      </div>
    </div>
  );
};

export default memo(Footer);
