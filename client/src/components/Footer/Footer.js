import React from "react";

import "./Footer.scss";

function Footer() {
  return (
    <footer>
      <p className="text-muted mt-3 mt-md-4 mb-1 text-center">
        &copy; The Movie App {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
