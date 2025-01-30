import { ReactNode } from "react";

export const Draggable = ({children}: {children: ReactNode}) => {

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('application/type', "Box");
        e.dataTransfer.effectAllowed = 'move';
    }

    return(
        <div draggable onDragStart={handleDrag}>{children}</div>
    )

}