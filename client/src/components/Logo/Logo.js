import React from "react";

import "./Logo.scss";

function Logo({ fontSize }) {
  return (
    <p className="logo my-0" style={{ fontSize: fontSize }}>
      FAKEFLIX
    </p>
  );
}

export default Logo;
