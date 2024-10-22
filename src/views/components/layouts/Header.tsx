import React from "react";
import { Link, useLocation } from "react-router-dom";
import "assets/styles/components/Header.scss";
import Button from "./Button";
import RouterPath from "routers/routesContants";

export const NAVBAR_ITEMS = [
    {
        id: 1,
        name: "Chat Service",
        path: RouterPath.CHAT,
    },
];

const Header = () => {
    const location = useLocation();

    return (
        <div className="header-wrapper">
            <div className="header-left-group">
                <div className="logo">
                    <Link to={RouterPath.BASE_URL} className="logo-link">
                        <h5 className="logo-title">Ai-lawer.app</h5>
                    </Link>
                </div>
            </div>
            <div className="btn-action-group">
                <ul className="navbar flex items-center">
                    {NAVBAR_ITEMS.map((item) => {
                        const isActive = location.pathname === item.path;
                        
                        return (
                            <li key={item.id} className={`navbar-item ${isActive ? 'btn--active' : ''}`}>
                                <Button
                                    to={item.path}
                                    className="navbar-item-link"
                                    variant="text"
                                >
                                    {item.name}
                                </Button>
                            </li>
                        );
                    })}
                </ul>
                <Button variant="outlined" size="small" to={RouterPath.CHAT}>
                    Start now
                </Button>
            </div>
        </div>
    );
};

export default React.memo(Header);
