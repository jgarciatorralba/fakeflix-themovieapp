import React from "react";
import { Link } from "react-router-dom";

import "./HelperParagraph.scss";

function HelperParagraph({ helperText = "", boldText, linkTo }) {
  return (
    <div className="helper-text">
      <p className="my-3">
        {helperText}{" "}
        <Link to={linkTo} className="text-decoration-none text-body">
          <b>{boldText}</b>.
        </Link>
      </p>
    </div>
  );
}

export default HelperParagraph;
