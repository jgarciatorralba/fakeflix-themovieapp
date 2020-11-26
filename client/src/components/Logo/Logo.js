import React from "react";

import "./Logo.scss";

function Logo({ fontSize }) {
  return (
    <div>
      <p className="logo my-0" style={{ fontSize: fontSize }}>
        FAKEFLIX
      </p>
    </div>
  );
}

export default Logo;
