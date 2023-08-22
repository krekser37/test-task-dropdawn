import React, { FC, useEffect } from 'react'
import Modal from './modal/modal'
import MenyItem from '../meny-item/meny-item';
import { createPortal } from 'react-dom';

interface IModals {
/*     children:; */
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modals: FC<IModals> = ({ /* children */ }) => {

/*     const mount = document.getElementById("modalsContainer");
    const el = document.createElement("div");

    useEffect(() => {
        mount.appendChild(el);
        return () => mount.removeChild(el);
    }, [el, mount]);

    return mount != null
    ? 
        createPortal(children, el)
    
    : null; */
    return <></>
}

export default Modals;
