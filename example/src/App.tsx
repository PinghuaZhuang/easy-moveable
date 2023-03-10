import React, { useEffect, useRef } from 'react';
import { Modal } from 'antd';
import ReactRotatable from '@moveable/rotatable/react';
// import Resizable from './core';

const App = () => {
  const elRef = useRef(null);

  // useEffect(() => {
  //   const r = new Resizable(elRef.current);
  //   return () => {
  //     r.destroy();
  //   };
  // }, []);

  return (
    <Modal open title="resizeable Demo" footer={null} width="95vw">
      <div
        className="app-container"
        style={{
          minHeight: '70vh',
          position: 'relative',
        }}
      >
        <ReactRotatable />
        <div
          id="resizeDemo"
          ref={elRef}
          style={
            {
              // transform: 'rotate(30deg)',
            }
          }
        >
          这里有内荣荣案例库解放啦就够了记录这里有内荣荣案例库解放啦就够了记录这里有内荣荣案例库解放啦就够了记录这里有内荣荣案例库解放啦就够了记录这里有内荣荣案例库解放啦就够了记录这里有内荣荣案例库解放啦就够了记录这里有内荣荣案例库解放啦就够了记录
        </div>
      </div>
    </Modal>
  );
};

export default App;
