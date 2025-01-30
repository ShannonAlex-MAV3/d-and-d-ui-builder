import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DroppedComponent } from './dropped-comp';

export const Canvas = forwardRef((props, ref) => {
  const [items, setItems] = useState([]);
  const containerRef = useRef(null);

  const onDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/type');
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setItems([...items, { id: uuidv4(), type, x, y, width: 100, height: 100 }]);
  };

  const updateItem = (id, updates) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  useImperativeHandle(ref, () => ({
    serialize: () => JSON.stringify(items),
    deserialize: (data) => setItems(JSON.parse(data)),
  }));

  return (
    <div
      ref={containerRef}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="canvas"
    >
      {items.map(item => (
        <DroppedComponent
          key={item.id}
          item={item}
          containerRef={containerRef}
          updateItem={updateItem}
        />
      ))}
    </div>
  );
});