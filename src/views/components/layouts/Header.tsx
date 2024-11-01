import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "assets/styles/components/Header.scss";
import Button from "./Button";
import RouterPath from "routers/routesContants";
import { useAppDispatch, useAppSelector } from "contexts/hooks";
import {
  Avatar,
  ClickAwayListener,
  Card,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
} from "@mui/material";
import { authLoginGoogle, AuthLogout } from "contexts/auth";
import WarningIcon from "@mui/icons-material/Warning";
import LogoutIcon from "@mui/icons-material/Logout";
import AvatarDE from "assets/images/avatar.webp";

export const NAVBAR_ITEMS = [
  {
    id: 1,
    name: "Chat Service",
    path: RouterPath.CHAT,
  },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const userAvatar = useAppSelector((state) => state.user.data?.photoURL) || AvatarDE;
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handleLoginWithGoogle = () => {
    dispatch(authLoginGoogle());
  };

  const handleAvatarClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(AuthLogout());
  };

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
              <li
                key={item.id}
                className={`navbar-item ${isActive ? "btn--active" : ""}`}
              >
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
        {isLogin ? (
          <div style={{ position: "relative" }}>
            <Avatar src={userAvatar || AvatarDE} onClick={handleAvatarClick} />
            {open && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <Card
                  elevation={0}
                  sx={{
                    boxShadow: "none",
                    position: "absolute",
                    top: "110%",
                    right: 0,
                    zIndex: 1,
                    border: "1px solid",
                    borderColor: "primary.main",
                    backgroundColor: "#aed7ff45",
                  }}
                >
                  <List
                    component="nav"
                    sx={{
                      width: "100%",
                      maxWidth: 350,
                      minWidth: 300,
                      backgroundColor: "background.paper",
                      borderRadius: "10px",
                      "& .MuiListItemButton-root": {
                        mt: 0.5,
                      },
                    }}
                  >
                    <ListItemButton
                      sx={{
                        backgroundColor: "#aed7ff45",
                        borderRadius: "10px",
                        mt: 1,
                        alignItems: "flex-start",
                        padding: 2,
                      }}
                      onClick={() => console.log("Premium")}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "primary.main" }}
                          >
                            Activate Premium
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.primary", mt: 0.5 }}
                              component="span"
                            >
                              Unlock exclusive features and enjoy an ad-free
                              experience by upgrading to our premium plan.
                            </Typography>
                            <Chip
                              icon={<WarningIcon color="inherit" />}
                              label="Limited"
                              size="small"
                              sx={{
                                bgcolor: "warning.main",
                                color: "white",
                                mt: 1,
                                display: "flex",
                                justifyContent: "center",
                              }}
                            />
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{
                        borderRadius: "10px",
                      }}
                      selected={selectedIndex === 4}
                      onClick={handleLogout}
                    >
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2">Logout</Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </Card>
              </ClickAwayListener>
            )}
          </div>
        ) : (
          <Button
            onClick={handleLoginWithGoogle}
            variant="outlined"
            size="small"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default React.memo(Header);
