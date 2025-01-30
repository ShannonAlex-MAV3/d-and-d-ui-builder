import React, { useRef } from 'react';
import { DraggableComponent } from './draggable-comp';
import { Canvas } from './canvas';
import './style.css';

const TestComp = () => {
  const canvasRef = useRef();

  return (
    <div>
      <div className="palette">
        <DraggableComponent type="Box">Box</DraggableComponent>
        <DraggableComponent type="Circle">Circle</DraggableComponent>
      </div>
      <Canvas ref={canvasRef} />
      
    </div>
  );
};

export default TestComp;