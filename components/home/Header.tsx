import React from "react";
import style from "@/styles/home/Header.module.css";

type HeaderProps = {};

export default React.forwardRef<HTMLDivElement, HeaderProps>(function Header(
  props,
  ref
) {
  return (
    <>
      <div className={style["navbar-offset"]}></div>
      <div className={style["header"]} id="Header" ref={ref}>
        <div className={style["header-title"]}>Hounslow Recycling Hub</div>
        <div className={style["header-description"]}>
          Your go-to stop for all recycling things in the London Borough of
          Hounslow!
        </div>
      </div>
    </>
  );
});
