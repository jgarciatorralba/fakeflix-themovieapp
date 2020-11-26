import React from "react";

import "./Footer.scss";

function Footer() {
  return (
    <footer>
      <p className="text-muted mt-5 mb-3">
        &copy; The Movie App {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
