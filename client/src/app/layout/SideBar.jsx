import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideBar.css";
import { useRef } from "react";

export default function SideBar(props) {
  const transition = useRef(null);

  const content = (
    <CSSTransition
      nodeRef={transition}
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-bar" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("sidebar-hook")
  );
}
