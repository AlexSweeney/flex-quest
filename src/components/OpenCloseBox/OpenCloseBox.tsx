import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import OpenCloseButton from '../OpenCloseButton/OpenCloseButton';
import { resetScrollBars, triggerOnTransitionEnd, triggerOnFirstTransitionEnd } from '../../utils/utils';
import './OpenCloseBox.scss';

export default function OpenCloseBox({
  title = '',
  variant = 'code',
  children,
}) {
  /**
   * press button on right to open / close box
   * 
   * animations on open and close
   */

  // ==== Ids
  const boxId = 'openCloseBox';
  const bodyId = 'openCloseBox-body';
  const contentWrapperId = 'content-wrapper';
  const verticalMaskId = 'vertical-mask';
  const horizontalMaskId = 'horizontal-mask';

  // ==== Open / Close
  const [isButtonCrossSymbol, setIsButtonCrossSymbol] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true); 

  // ==== Classes
  const [isOpenClass, setIsOpenClass] = useState('openCloseBox__open');
  const [isOpenContentClass, setIsOpenContentClass] = useState('openCloseBox-contentWrapper__open');
  const [overflowClass, setOverflowClass] = useState('overflow-auto');
  // const [scrollbarClass, setScrollbarClass] = useState('openCloseBox-contentWrapper__showScrollbars');
  const [verticalMaskClass, setVerticalMaskClass] = useState('openCloseBox-verticalMask__showScrollbar');
  const [horizontalMaskClass, setHorizontalMaskClass] = useState('openCloseBox-horizontalMask__showScrollbar');

  // ============== Master Fns
  const onClickOpenBox = () => {  
    setIsOpen(true)

    openContentWrapper()
      .then(showMinusOnButton)
      .then(showOverflow)
      .then(openBox)
      // .then(repositionScrollbars)
  };

  const onClickCloseBox = () => {  
    setIsOpen(false)
    
    resetScrollBars(contentWrapperId, 750) 
      .then(hideScrollBars)
      .then(closeBox)
      .then(() => {
        showCrossOnButton()
        closeContentWrapper()
      })
  };

  // ============== Util Fns
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

  const showOverflow = () => { 
    return new Promise(resolve => {
      setOverflowClass('overflow-auto')
      resolve(null)
    })
  }

  const hideScrollBars = () => { 
    return new Promise(resolve => { 
      setVerticalMaskClass('openCloseBox-verticalMask__hideScrollbar') 
      setHorizontalMaskClass('openCloseBox-horizontalMask__hideScrollbar')

      function onScrollbarFade() {
        setOverflowClass('overflow-hidden')
        resolve(null)
      }

      triggerOnFirstTransitionEnd([verticalMaskId, horizontalMaskId], 'opacity', onScrollbarFade)
    })
  }

  const openContentWrapper = () => {
    return new Promise(resolve => {
      setIsOpenContentClass('openCloseBox-contentWrapper__open')
      triggerOnTransitionEnd(contentWrapperId, 'height', resolve)
    })
  }

  const closeContentWrapper = () => {
    console.log('close content wrapper')

    return new Promise(resolve => { 
      setIsOpenContentClass('openCloseBox-contentWrapper__closed')
      triggerOnTransitionEnd(contentWrapperId, 'height', resolve)
    })
  }

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