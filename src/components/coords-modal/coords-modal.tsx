import { useEffect, useRef, useState } from 'react';
import style from './coords-modal.module.css';

type TCoordsModal = {
  dataEl: { left: number, top: number, bottom: number, right: number, width: number, height: number };
  updateTooltipCoords: () => void;
  position: undefined | 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';
  children: React.ReactNode;

} & React.HTMLProps<HTMLDivElement>;

export const CoordsModal = ({ position, dataEl, updateTooltipCoords, children, ...props }: TCoordsModal) => {

  console.log('789', position);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { left, top, bottom, right, width, height } = dataEl;
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [leftX, setleftX] = useState(0);
  const [topY, settopY] = useState(0);

  let leftXRef = useRef(0)
  let topYRef = useRef(0)

  leftXRef.current = leftX;
  topYRef.current = topY;

  console.log('leftX=', leftX, 'topY=', topY);

  useEffect(() => {
    window.addEventListener("resize", updateTooltipCoords);
    window.addEventListener("scroll", updateTooltipCoords);
    return () => {
      window.removeEventListener("resize", updateTooltipCoords);
      window.removeEventListener("scroll", updateTooltipCoords)
    };
  }, [updateTooltipCoords]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const positionAt = (position: undefined | 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right') => {
    console.log('position', position);
    switch (position) {
      case undefined:
        break;
      case "top_left":
        setleftX(left)
        settopY(top + height + window.scrollY)
        break;
      case "top_right":
        setleftX(right - wrapperWidth - window.scrollX)
        settopY(top + height + window.scrollY)
        break;
      case "bottom_right":
        setleftX(right - wrapperWidth)
        settopY(bottom - height - wrapperHeight + window.scrollY)
        break;
      case "bottom_left":
        setleftX(left)
        settopY(bottom - height - wrapperHeight + window.scrollY)
        break;
    }
  };

  useEffect(() => {
    if (wrapperRef.current != null) {
      console.log(wrapperRef.current);
      setWrapperHeight(wrapperRef.current.offsetHeight);
      setWrapperWidth(wrapperRef.current.offsetWidth);
    }
    
    positionAt(position);

  }, [left, top, right, bottom, height, width, wrapperHeight, wrapperWidth, wrapperRef, position, positionAt])

  return (
    <>
      <div
        className={style.wrapper}
        ref={wrapperRef}
        style={{ left: leftX, top: topY }}
        {...props}>
        <div className={style.content}>
          {children}
        </div>
      </div >
    </>
  )
};
