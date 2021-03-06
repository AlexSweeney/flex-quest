import React from 'react'; 
import { useState, ReactNode } from 'react';
import OpenCloseButton from '../OpenCloseButton/OpenCloseButton';
import { resetScrollBars, triggerOnTransitionEnd, triggerOnFirstTransitionEnd, getScrollPositions, moveScrollBars } from '../../utils/utils';
import './OpenCloseBox.scss';

export type OpenCloseBoxProps = {
  title: string,
  children: ReactNode,
}

type scrollbarPositionType = {
  scrollLeft: number,
  scrollTop: number,
};

export default function OpenCloseBox({
  title = '', 
  children,
}: OpenCloseBoxProps) {
  /**
   * press button on right to open / close box
   * 
   * animations on open and close
   */

  // Test for no overflow / one overflow

  // ==== Ids
  const boxId = 'openCloseBox';
  const bodyId = 'openCloseBox-body';
  const contentWrapperId = 'content-wrapper';
  const verticalMaskId = 'vertical-mask';
  const horizontalMaskId = 'horizontal-mask';

  // ==== Open / Close
  const scrollbarMoveTime = 750;
  const defaultScrollbarPosition: scrollbarPositionType = { scrollLeft: 0, scrollTop: 0 };
  const [isButtonCrossSymbol, setIsButtonCrossSymbol] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true); 
  const [scrollbarPositions, setScrollbarPositions] = useState<scrollbarPositionType>(defaultScrollbarPosition);

  // ==== Classes
  const [isOpenClass, setIsOpenClass] = useState<string>('openCloseBox__open');
  const [isOpenContentClass, setIsOpenContentClass] = useState<string>('openCloseBox-contentWrapper__open');
  const [overflowClass, setOverflowClass] = useState<string>('overflow-auto'); 
  const [verticalMaskClass, setVerticalMaskClass] = useState<string>('openCloseBox-verticalMask__showScrollbar');
  const [horizontalMaskClass, setHorizontalMaskClass] = useState<string>('openCloseBox-horizontalMask__showScrollbar');

  // ============== Master Fns
  const onClickOpenBox = () => {  
    setIsOpen(true)

    showMinusOnButton()
    openContentWrapper() 
      .then(showOverflow)
      .then(showScrollbars)
      .then(openBox)
      .then(repositionScrollbars)
  };

  const onClickCloseBox = () => {  
    setIsOpen(false)
    
    closeScrollbars()
      .then(hideScrollbars)
      .then(closeBox)
      .then(() => {
        showCrossOnButton()
        closeContentWrapper()
      })
  };

  // ============== Util Fns
  const showOverflow = () => { 
    return new Promise(resolve => {
      setOverflowClass('overflow-auto')
      resolve(null)
    })
  }

  // ----- Box
  const openBox = () => {
    return new Promise(resolve => {
      setIsOpenClass('openCloseBox__open') 

      triggerOnTransitionEnd(boxId, 'width', resolve)
    })
  }

  const closeBox = () => {
    return new Promise(resolve => {
      setIsOpenClass('openCloseBox__closed') 

      triggerOnTransitionEnd(boxId, 'width', () => { 
        resolve(null)
      })
    })
  }

  // ----- Scrollbars
  const closeScrollbars = () => {
    // save position
    const currentPosition = getScrollPositions(contentWrapperId);
    setScrollbarPositions(currentPosition) 

    // move to default position
    return new Promise(resolve => { 
      moveScrollBars(contentWrapperId, defaultScrollbarPosition, scrollbarMoveTime).then(resolve)
    })
  }

  const repositionScrollbars = () => {
    // move to saved position
    return new Promise(resolve => { 
      moveScrollBars(contentWrapperId, scrollbarPositions, scrollbarMoveTime).then(resolve)
    })
  }

  const hideScrollbars = () => { 
    return new Promise(resolve => { 
      setVerticalMaskClass('openCloseBox-verticalMask__hideScrollbar') 
      setHorizontalMaskClass('openCloseBox-horizontalMask__hideScrollbar')

      function onScrollbarFade() {
        setOverflowClass('overflow-hidden')
        resolve(null)
      }

      // works for one / two overflows
      triggerOnFirstTransitionEnd([verticalMaskId, horizontalMaskId], 'opacity', onScrollbarFade)
    })
  }

  const showScrollbars = () => {
    return new Promise(resolve => {
      setOverflowClass('overflow-auto')
      setVerticalMaskClass('openCloseBox-verticalMask__showScrollbar') 
      setHorizontalMaskClass('openCloseBox-horizontalMask__showScrollbar')

      // works for one / two overflows
      triggerOnFirstTransitionEnd([verticalMaskId, horizontalMaskId], 'opacity', resolve)
    })
  }

  // ----- Content Wrapper
  const openContentWrapper = () => {
    return new Promise(resolve => {
      setIsOpenContentClass('openCloseBox-contentWrapper__open')
      triggerOnTransitionEnd(contentWrapperId, 'height', resolve)
    })
  }

  const closeContentWrapper = () => { 
    return new Promise(resolve => { 
      setIsOpenContentClass('openCloseBox-contentWrapper__closed')
      triggerOnTransitionEnd(contentWrapperId, 'height', resolve)
    })
  }

  // ----- Open Close Button
  const showCrossOnButton = () => {
    return new Promise(resolve => {
      setIsButtonCrossSymbol(true)
      resolve(null)
    })
  }

  const showMinusOnButton = () => {
    return new Promise(resolve => {
      setIsButtonCrossSymbol(false)
      resolve(null)
    })
  }

  // ============== Event Handlers
  const handleButtonClick = () => {
    if(isOpen) onClickCloseBox();
    else onClickOpenBox();
  }

  // ============== Output
  return (
    <div className={`openCloseBox ${isOpenClass}`} id={boxId}> 
      <div className='openCloseBox-header'>
        <div className='openCloseBox-title'>{ title }</div>
        <div className='openCloseBox-buttonContainer'>
          <OpenCloseButton 
            isCrossSymbol={isButtonCrossSymbol} 
            handleClick={handleButtonClick}/>
        </div>
      </div>
      <div className={`openCloseBox-body ${overflowClass}`} id={bodyId}>
        <div className='openCloseBox-maskWrapper'>
          <div className={`openCloseBox-verticalMask ${verticalMaskClass}`} id={verticalMaskId}/>
          <div className={`openCloseBox-horizontalMask ${horizontalMaskClass}`} id={horizontalMaskId}/>
        </div>
        <div className={`openCloseBox-contentWrapper ${isOpenContentClass} ${overflowClass}`} 
          id={contentWrapperId}>
          {children}
        </div>  
      </div>
    </div>
  )
}