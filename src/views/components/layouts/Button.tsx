import React, { memo } from "react";
import { Link } from "react-router-dom";
import "assets/styles/components/Button.scss";

type Size = "small" | "medium" | "large";
type Type = "button" | "submit" | "reset";
type Variant = "text" | "contained" | "outlined";

interface IButton {
  size?: Size;
  type?: Type;
  variant?: Variant;
  to?: string;
  disable?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Button: React.FC<IButton> = ({
  size = "medium",
  type = "button",
  variant = "contained",
  leftIcon,
  rightIcon,
  loading = false,
  to,
  disable = false,
  children,
  className = "",
  ...props
}) => {
  const classes = [
    "btn",
    `btn-${size}`,
    `btn-${variant}`,
    disable && "btn-disabled",
    loading && "btn-loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...props} >
        {leftIcon && <span className="btn-icon left-icon">{leftIcon}</span>}
        {loading ? <span className="btn-loading">Loading...</span> : children}
        {rightIcon && <span className="btn-icon right-icon">{rightIcon}</span>}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disable} {...props}>
      {leftIcon && <span className="btn-icon left-icon">{leftIcon}</span>}
      {loading ? <span className="btn-loading">Loading...</span> : children}
      {rightIcon && <span className="btn-icon right-icon">{rightIcon}</span>}
    </button>
  );
};

export default memo(Button);
