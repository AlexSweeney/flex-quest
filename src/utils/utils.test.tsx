import { triggerOnFirstTransitionEnd, triggerOnTransitionEnd } from './utils';
import { EventEmitter } from 'events';
import { cleanup, createEvent, fireEvent, getByRole, getByTestId } from '@testing-library/react';

afterEach(() => {

  cleanup()
})

describe.only('triggerOnTransitionEnd', () => {
  it('should call function on transitionend event', () => {  
    const idOne = "el-one"; 
    const endFn = jest.fn();

    // append Node -> util fn
    const divOne = document.createElement("button");
    divOne.id = idOne; 
    document.body.appendChild(divOne) 

    // listen
    triggerOnTransitionEnd(idOne, 'width', endFn)

    // trigger event 
    const elOne = getByRole(document.body, 'button');
    const event = createEvent.transitionEnd(elOne);   
    Object.defineProperty(event, 'propertyName', {
      value: 'width',
    })

    fireEvent(elOne, event)

    document.body.removeChild(divOne)

    expect(endFn).toHaveBeenCalledTimes(1)
  })

  it('should not call function on transitionend event emitted from child', () => {
    const divId = 'div';
    const endFn = jest.fn();

    // <div><button/></div>
    const div = document.createElement("div");
    div.id = divId;
    const button = document.createElement('button');

    div.appendChild(button)

    document.body.appendChild(div) 

    // listen
    triggerOnTransitionEnd(divId, 'width', endFn)

    // trigger event 
    const buttonNode = getByRole(document.body, 'button');
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
    const ids = [idOne, idTwo];
    const endFn = () => { console.log('endFn') };

    // add to document body
    const divOne = document.createElement("div");
    divOne.id = idOne;

    const divTwo = document.createElement("div");
    divTwo.id = idTwo;

    document.body.appendChild(divOne)
    document.body.appendChild(divTwo)

    // trigger events 
    triggerOnTransitionEnd(idOne, 'exampleEvent', endFn)

    const nodeOne: HTMLElement | null = document.getElementById(idOne);
    nodeOne && nodeOne.dispatchEvent(new Event("transitionend", { bubbles: true }));

    // check
    expect(endFn).toHaveBeenCalledTimes(1)
  })

  // it('should not trigger function on second transition end', () => {
  // })
})