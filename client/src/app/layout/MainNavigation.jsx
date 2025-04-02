import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideBar from "./SideBar";
import { useState } from "react";
import Backdrop from "../shared/components/UIElements/Backdrop";

export default function MainNavigation() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const openSidebar = () => {
    setSidebarIsOpen(true);
  };

  const closeSidebar = () => {
    setSidebarIsOpen(false);
  };

  return (
    <>
      {sidebarIsOpen && <Backdrop onClick={closeSidebar} />}

      <SideBar show={sidebarIsOpen} onClick={closeSidebar}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideBar>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openSidebar}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}
