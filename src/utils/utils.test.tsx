import { triggerOnFirstTransitionEnd, triggerOnTransitionEnd } from './utils';
import { EventEmitter } from 'events';
import { cleanup, createEvent, fireEvent, getByRole, getByText, render } from '@testing-library/react';

afterEach(() => { 
  cleanup() 
})

describe('triggerOnTransitionEnd', () => {
  it('should call function on transitionend event', () => {  
    const idOne = "el-one"; 
    const endFn = jest.fn();

    // append Node
    const button = <button id={idOne}>Button</button>;
    const { container } = render(button);
  
    // listen
    triggerOnTransitionEnd(idOne, 'width', endFn)

    // trigger event 
    const buttonNode = getByRole(container, 'button');
    const event = createEvent.transitionEnd(buttonNode);   
    Object.defineProperty(event, 'propertyName', {
      value: 'width',
    })

    fireEvent(buttonNode, event) 

    // check
    expect(endFn).toHaveBeenCalledTimes(1) 
  })

  it('should not call function on transitionend event emitted from child', () => {
    const divId = 'div';
    const endFn = jest.fn(); 

    // render
    const wrappedButton = (
      <div id={divId}>
        <button>Button</button>
      </div>
    );
    
    const { container } = render(wrappedButton) 

    // listen
    triggerOnTransitionEnd(divId, 'width', endFn)

    // trigger event 
    const buttonNode = getByRole(container, 'button');
    const event = createEvent.transitionEnd(buttonNode, {
      propertyName: 'width',
      bubbles: true,
    });

    fireEvent(buttonNode, event)

    // check
    expect(endFn).toHaveBeenCalledTimes(0)
  })
})

describe('triggerOnFirstTransitionEnd', () => {
  it('should trigger function on first transition end', () => {
    // consts
    const idOne = "el-one";
    const idTwo = "el-two"; 
    const textOne = "button one";
    const textTwo = "button two";

    const ids = [idOne, idTwo];
    const endFn = jest.fn();

    // render
    const buttons = (
      <>
        <button id={idOne}>{textOne}</button>
        <button id={idTwo}>{textTwo}</button>
      </>
    );

    const { container } = render(buttons);

    // listen
    triggerOnFirstTransitionEnd(ids, 'width', endFn)

    // trigger event 
    const buttonNode = getByText(container, textOne);
    const event = createEvent.transitionEnd(buttonNode);   
    Object.defineProperty(event, 'propertyName', {
      value: 'width',
    })

    fireEvent(buttonNode, event) 

    // check
    expect(endFn).toHaveBeenCalledTimes(1)
  })

  it('should not trigger function on second transition end', () => {
    // consts
    const idOne = "el-one";
    const idTwo = "el-two"; 
    const textOne = "button one";
    const textTwo = "button two";

    const ids = [idOne, idTwo];
    const endFn = jest.fn();

    // render
    const buttons = (
      <>
        <button id={idOne}>{textOne}</button>
        <button id={idTwo}>{textTwo}</button>
      </>
    );

    const { container } = render(buttons);

    // listen
    triggerOnFirstTransitionEnd(ids, 'width', endFn)

    // trigger events 
    const buttonOneNode = getByText(container, textOne);
    const eventOne = createEvent.transitionEnd(buttonOneNode);   
    Object.defineProperty(eventOne, 'propertyName', {
      value: 'width',
    })

    const buttonTwoNode = getByText(container, textOne);
    const eventTwo = createEvent.transitionEnd(buttonTwoNode);   
    Object.defineProperty(eventTwo, 'propertyName', {
      value: 'width',
    })

    fireEvent(buttonOneNode, eventOne) 
    fireEvent(buttonTwoNode, eventTwo) 

    // check
    expect(endFn).toHaveBeenCalledTimes(1)
  })
})