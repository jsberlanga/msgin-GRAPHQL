import React from "react";

const Footer = () => {
  return (
    <div id="footer">
      <div className="footer--title">
        © {new Date().getFullYear()},{" "}
        <a
          href="https://juliosoto.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          juliosoto.dev
        </a>
        . All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
