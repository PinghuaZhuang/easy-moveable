import React, { useEffect, useRef } from 'react';
import { Modal } from 'antd';
import ReactRotatable from '@moveable/rotatable/react';
import Resizable from '@moveable/resizable';
import Inspect from '@moveable/inspect';
import { Direction } from '@moveable/utils';

const App = () => {
  const elRef = useRef(null);

  useEffect(() => {
    const instance = new Resizable(elRef.current!, {
      // controls: ['s', 'n']
    });
    console.log(instance);
    return () => {
      instance.destroy();
    };
  }, []);

  // useEffect(() => {
  //   const instance = new Inspect(elRef.current!);
  //   console.log('new Inspect()', instance);
  //   return () => {
  //     instance.destroy();
  //   }
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
              transform: 'rotate(67deg)',
              width: 300,
              border: '1px solid black',
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
