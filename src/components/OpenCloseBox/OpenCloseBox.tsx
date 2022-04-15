import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import OpenCloseButton from '../OpenCloseButton/OpenCloseButton';
import { triggerOnTransitionEnd } from '../utils';
import './OpenCloseBox.scss';

export default function OpenCloseBox({
  title = '',
}) {
  const boxId = 'openCloseBox';
  const [isOpen, setIsOpen] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpenClass, setIsOpenClass] = useState('openCloseBox__open');

  // ============== Event Handlers
  const startOpen = () => {
    console.log('start open')
    setIsOpenClass('openCloseBox__closed')
    setIsAnimating(true)
    triggerOnTransitionEnd(boxId, 'width', onEndOpen)
  }

  const onEndOpen = () => {
    console.log('end open')
    setIsAnimating(false)
  }

  const startClose = () => {
    console.log('start close')
    setIsOpenClass('openCloseBox__open')
    setIsAnimating(true)
    triggerOnTransitionEnd(boxId, 'width', onEndClose)
  }

  const onEndClose = () => {
    console.log('end close')
    setIsAnimating(false)
  }

  const handleButtonClick = () => {
    const isClosing = !isOpen;

    if(isClosing) startClose();
    else startOpen();

    setIsOpen(oldVal => !oldVal)
  }

  // ============== Event Handlers 

  return (
    <div className={`openCloseBox ${isOpenClass}`} id={boxId}> 
      <div className='openCloseBox-header'>

        <div className='openCloseBox-title'>{ title }</div>
        <div className='openCloseBox-buttonContainer'>
          <OpenCloseButton 
            isOpen={isOpen}
            parentIsAnimating={isAnimating} 
            handleClick={handleButtonClick}/>
        </div>
      </div>
    </div>
  )
}