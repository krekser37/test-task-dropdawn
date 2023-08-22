"use client";

import { useEffect, useState, useRef, MutableRefObject, useCallback, RefObject } from 'react';
import styles from './page.module.css'
import { Menu } from 'react-feather';
import { CoordsModal } from '@/components/coords-modal/coords-modal';
import MenyItem from '@/components/meny-item/meny-item';
import Portal from '@/components/portal/portal';

export default function Home() {
  const data = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
  }
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<string>('');
  const [dataEl, setDataEl] = useState<{ left: number, top: number, bottom: number, right: number, width: number, height: number }>(data);
  const [refCurrent, setRefCurrent] = useState(null); /* <MutableRefObject<null>> */
  const [position, setPosition] = useState<'top_left' | 'top_right' | 'bottom_left' | 'bottom_right' | undefined>(undefined);
  const { left, top, bottom, right, width, height } = dataEl;

  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const fourRef = useRef(null);
  const fiveRef = useRef(null);
  const sixRef = useRef(null);

  let dataElRef = useRef<{ left: number, top: number, bottom: number, right: number, width: number, height: number }>();
  let positionRef = useRef<'top_left' | 'top_right' | 'bottom_left' | 'bottom_right' | undefined>();

  dataElRef.current = dataEl;
  positionRef.current = position;

  const positionType = useCallback(() => {
    /*     console.log('top', top); */
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
    setModal(tab);
    setRefCurrent(ref.current);
    updateTooltipCoords(refCurrent);
    positionType();
  }, [positionType, refCurrent, updateTooltipCoords]);

  const onClose = () => {
    setIsOpen(false);
    setModal('')
    setDataEl(data)
  };

  const scroll = useCallback(() => {
    window.addEventListener('scroll', positionType);
    window.addEventListener("scroll", updateTooltipCoords);
    /*     console.log(window.innerHeight, window.scrollY, dataEl.top); */
    /*     if (window.scrollY > dataEl.top) {
          setIsOpen(false);
        } else setIsOpen(true); */
  }, [positionType, dataEl.top, updateTooltipCoords]);

  useEffect(() => {
    positionType()
    updateTooltipCoords(refCurrent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll, updateTooltipCoords, refCurrent])

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
      <Portal show={isOpen} onOverlayClick={onClose}><CoordsModal position={position}
        dataEl={dataEl} updateTooltipCoords={() => updateTooltipCoords(refCurrent)}>
        <MenyItem />
      </CoordsModal></Portal>
    </main>
  )
}
