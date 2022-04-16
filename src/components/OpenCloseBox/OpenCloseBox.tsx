import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import OpenCloseButton from '../OpenCloseButton/OpenCloseButton';
import { resetScrollBars, triggerOnTransitionEnd } from '../utils';
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

  // resetScrollbar

  const boxId = 'openCloseBox';
  const bodyId = 'openCloseBoxBody';
  const contentWrapperId = 'contentWrapper';

  const [isButtonCrossSymbol, setIsButtonCrossSymbol] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true); 

  const [isOpenClass, setIsOpenClass] = useState('openCloseBox__open');
  const [isOpenContentClass, setIsOpenContentClass] = useState('openCloseBox-contentWrapper__open');
  const [overflowClass, setOverflowClass] = useState('overflow-auto');

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
      .then(hideOverflow)
      .then(closeBox)
      .then(showCrossOnButton) 
      .then(closeContentWrapper)
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
        resolve()
      })
    })
  }

  const showOverflow = () => { 
    return new Promise(resolve => {
      setOverflowClass('overflow-auto')
      resolve()
    })
  }

  const hideOverflow = () => { 
    return new Promise(resolve => {
      setOverflowClass('overflow-hidden')
      resolve()
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
      resolve()
    })
  }

  const showMinusOnButton = () => {
    return new Promise(resolve => {
      setIsButtonCrossSymbol(false)
      resolve()
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
        <div className={`openCloseBox-contentWrapper ${isOpenContentClass} ${overflowClass}`} id={contentWrapperId}>
          {children}
        </div>
      </div>
    </div>
  )
}