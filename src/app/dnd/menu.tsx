import React from "react";
import { Constants } from '../../constants';

export const Menu = React.forwardRef((props, ref) => {

    return (
        <div className="w-[70px] h-[80vh] absolute m-2 p-1 bg-[#f1e07e] rounded-lg z-50 flex flex-col gap-5 justify-center items-center">
            {
                Constants.COMPONENTS.map((shape, index) => (
                    <div key={`${shape}-${index}`} className="w-[80%] h-[8vh] border-1 rounded-lg border-[#a09d9d] text-sm text-center flex items-center justify-center">
                        {shape}
                    </div>
                ))
            }
        </div>
    )
})