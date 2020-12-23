import React from "react";
import cn from "classnames";

import "./Label.scss";

function Label({ children, additionalClasses = "", ...props }) {
  const classes = cn(
    "sr-only",
    additionalClasses && additionalClasses.split(" ")
  );

  return (
    <label className={classes} {...props}>
      {children}
    </label>
  );
}

export default Label;
