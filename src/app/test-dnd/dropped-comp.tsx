import React, { useState, useEffect } from 'react';

export const DroppedComponent = ({ item, containerRef, updateItem }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + item.x);
    const offsetY = e.clientY - (rect.top + item.y);
    setIsDragging(true);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: item.width,
      height: item.height
    });
  };

  const handleMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    if (isDragging) {
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;
      updateItem(item.id, { x, y });
    } else if (isResizing) {
      const width = Math.max(20, resizeStart.width + (e.clientX - resizeStart.x));
      const height = Math.max(20, resizeStart.height + (e.clientY - resizeStart.y));
      updateItem(item.id, { width, height });
    }
  };

  const handleUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [isDragging, isResizing]);

  return (
    <div
      className="dropped-component"
      style={{
        left: item.x,
        top: item.y,
        width: item.width,
        height: item.height,
        position: 'absolute',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="resize-handle" onMouseDown={handleResizeStart} />
      {item.type}
    </div>
  );
};