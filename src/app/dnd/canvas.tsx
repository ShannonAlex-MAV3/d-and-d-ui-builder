import React, { useRef } from "react";
import './canvas.css';

export const Canvas = React.forwardRef((props, ref) => {

    const containerRef = useRef(null);

    return <div id="container" ref={containerRef}></div>
})