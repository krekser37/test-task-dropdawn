"use client";

import { useEffect, useState, useRef, MutableRefObject, useCallback } from 'react';
import styles from './page.module.css';
import { Menu } from 'react-feather';
import { CoordsModal } from '@/components/coords-modal/coords-modal';
import MenyItem from '@/components/meny-item/meny-item';
import Portal from '@/components/portal/portal';

const data = {
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: 0,
  height: 0,
}

type Tdata = {
  left: number,
  top: number,
  bottom: number,
  right: number,
  width: number,
  height: number,
}

export default function Home() {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menyHidden, setMenyHidden] = useState<boolean>(true);
  const [dataEl, setDataEl] = useState<Tdata>(data);
  const [refCurrent, setRefCurrent] = useState(null);
  const [position, setPosition] = useState<'top_left' | 'top_right' | 'bottom_left' | 'bottom_right' | undefined>(undefined);
  const { left, top, bottom, right, width } = dataEl;

  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const fourRef = useRef(null);
  const fiveRef = useRef(null);
  const sixRef = useRef(null);

  let dataElRef = useRef<Tdata>();
  let positionRef = useRef<'top_left' | 'top_right' | 'bottom_left' | 'bottom_right' | undefined>();

  dataElRef.current = dataEl;
  positionRef.current = position;

  const positionType = useCallback(() => {
    if (width === 0) {
      return
    } else if (left < window.innerWidth / 2 && top < (window.innerHeight + window.scrollY) / 2) {
      return setPosition('top_left');
    } else if (right > window.innerWidth / 2 && top < window.innerHeight / 2) {
      return setPosition('top_right');
    } else if (bottom > (window.innerHeight - window.scrollY) / 2 && left < (window.innerWidth - window.scrollX) / 2) {
      return setPosition('bottom_left');
    } else if (bottom > (window.innerHeight - window.scrollY) / 2 && right > window.innerWidth / 2) {
      return setPosition('bottom_right');
    }
  }, [bottom, left, right, top, width]);

  const updateTooltipCoords = useCallback((refCurrent: any) => {
    if (refCurrent === null) {
      return;
    }
    const rect = refCurrent.getBoundingClientRect();
    setDataEl({
      left: rect.left + window.screenX,
      top: rect.top + window.screenY,
      bottom: rect.bottom + window.screenY,
      right: rect.right + window.screenX,
      width: rect.width,
      height: rect.height,
    });
  }, []);

  const openTab = useCallback((ref: MutableRefObject<null>, tab: string) => {
    setIsOpen(true);
    setRefCurrent(ref.current);
    updateTooltipCoords(refCurrent);
    positionType();
  }, [positionType, refCurrent, updateTooltipCoords]);

  const onClose = () => {
    console.log('Dropdawn закрыт');
    setIsOpen(false);
    setDataEl(data)
  };

  const scroll = useCallback(() => {
    window.addEventListener('scroll', positionType);
    window.addEventListener("scroll", updateTooltipCoords);
  }, [positionType, updateTooltipCoords]);

  useEffect(() => {
    dataEl.top < 0 ? setMenyHidden(false) : setMenyHidden(true)
  }, [dataEl.top])

  useEffect(() => {
    positionType()
    updateTooltipCoords(refCurrent);
  }, [scroll, updateTooltipCoords, positionType, refCurrent])

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Test task Dropdawn
      </h1>
      <div className={styles.container}>
        <ul className={styles.menu}>
          <li className={styles.menu__item} ref={oneRef} onClick={(e) => openTab(oneRef, "one")}><Menu /></li>
          <li className={styles.menu__item} ref={twoRef} onClick={(e) => openTab(twoRef, "two")}><Menu /></li>
          <li className={styles.menu__item} ref={threeRef} onClick={(e) => openTab(threeRef, "three")}><Menu /></li>
          <li className={styles.menu__item} ref={fourRef} onClick={(e) => openTab(fourRef, "four")}><Menu /></li>
          <li className={styles.menu__item} ref={fiveRef} onClick={(e) => openTab(fiveRef, "five")}><Menu /></li>
          <li className={styles.menu__item} ref={sixRef} onClick={(e) => openTab(sixRef, "six")}><Menu /></li>
        </ul>
      </div>
      <Portal show={isOpen} onOverlayClick={onClose}>
        <CoordsModal
          position={position}
          dataEl={dataEl}
          updateTooltipCoords={() => updateTooltipCoords(refCurrent)}>
          <MenyItem hidden={menyHidden} />
        </CoordsModal></Portal>
    </main>
  )
}
