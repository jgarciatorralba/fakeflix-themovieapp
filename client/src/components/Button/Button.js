import React from "react";
import cn from "classnames";

import "./Button.scss";

function Button({
  children,
  htmlType = "button",
  additionalClasses,
  ...props
}) {
  const classes = cn(
    "btn btn-netflix",
    additionalClasses && additionalClasses.split(" ")
  );

  return (
    <button className={classes} type={htmlType} {...props}>
      {children}
    </button>
  );
}

export default Button;
