import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import style from './portal.module.css';

type TPortal = {
  children: React.ReactNode;
  onOverlayClick: () => void;
  show: boolean;
}

const Portal = ({ show, children, onOverlayClick }: TPortal) => {
  const [isBrowser, setIsBrowser]=useState(false);

  useEffect(()=>{
    setIsBrowser(show)
  }, [show])

  const content = show && <><div className={style.overlay} onClick={onOverlayClick} ></div>{children}</>;

  if (isBrowser){
    return createPortal(content, 
    document.getElementById("portal-root")!)
  }
};

export default Portal;