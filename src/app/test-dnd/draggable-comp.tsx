import React from 'react';

export const DraggableComponent = ({ type, children }) => {
  const onDragStart = (e) => {
    e.dataTransfer.setData('application/type', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div draggable onDragStart={onDragStart} className="draggable">
      {children}
    </div>
  );
};