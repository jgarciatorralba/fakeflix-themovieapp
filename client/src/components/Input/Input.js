import React from "react";
import cn from "classnames";

import "./Input.scss";

function Input({
  htmlType,
  id,
  name,
  additionalClasses = "",
  placeholder,
  ...props
}) {
  const classes = cn(
    "form-control",
    additionalClasses && additionalClasses.split(" ")
  );

  return (
    <input
      type={htmlType}
      id={id}
      name={name}
      className={classes}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
