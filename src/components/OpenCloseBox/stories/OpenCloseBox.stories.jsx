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

export const Code = () => {
  const title = 'storybook title';

  return (
    <Wrapper>
      <OpenCloseBox title={title}>
        <div style={{padding: '1em', whiteSpace: 'nowrap'}}>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis, quo, aliquam tempore pariatur, harum ea molestiae inventore vel placeat blanditiis maxime unde at aspernatur dolorem dicta! Reprehenderit quas porro ullam!</p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p> 
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p> 
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p>
          <p>Lorem </p> 
        </div>
      </OpenCloseBox>
    </Wrapper>
  ) 
}