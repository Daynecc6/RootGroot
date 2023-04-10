import React, { useRef } from "react";
import Nav from "./Navbar";

const Header = () => {
  const landingRef = useRef(null);
  const aboutAppRef = useRef(null);
  const aboutUsRef = useRef(null);

  return (
    <div>
      <Nav
        landingRef={landingRef}
        aboutAppRef={aboutAppRef}
        aboutUsRef={aboutUsRef}
      />
    </div>
  );
};

export default Header;
