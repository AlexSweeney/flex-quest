import React from 'react';
import OpenCloseBox from '../OpenCloseBox.tsx';

export default {
  title: 'OpenCloseBox',
  component: OpenCloseBox,
}

function Wrapper({children}) {
  const style = {
    width: '100%', 
    height: '90vh',  
    'max-height': '100%', 
  };
  
  return (
    <div style={style}>
      {children}
    </div>
  ) 
}

// export const Default = () => <OpenCloseBox/>;

export const Default = () => {
  const title = 'storybook title';

  return (
    <Wrapper>
      <OpenCloseBox title={title}/>
    </Wrapper>
  ) 
}