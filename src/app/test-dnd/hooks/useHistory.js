// useHistory.js
import { useState } from 'react';

export const useHistory = (initial) => {
  const [history, setHistory] = useState([initial]);
  const [pointer, setPointer] = useState(0);

  const push = (state) => {
    setHistory([...history.slice(0, pointer + 1), state]);
    setPointer(pointer + 1);
  };

  const undo = () => pointer > 0 && setPointer(pointer - 1);
  const redo = () => pointer < history.length - 1 && setPointer(pointer + 1);

  return [history[pointer], push, undo, redo];
};