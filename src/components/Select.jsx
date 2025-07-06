import React from "react";
import { useId } from "react";
import { forwardRef } from "react";

function Select({
    options,
    label,
    className = '',           // it will be fine if empty
    ...props                 // other properties if send
}, ref) {
    const id = useId();
    // we print label and select and if options are there then only we are loooping it
    return (
        <div className="w-full">
            {(label) && <label htmlFor={id} className="">{label} </label>}

            <select className={className} id={id} {...props} ref={ref}>
                {options?.map((option) => {
                  return   <option value={option} key={option}>{option}</option>
                })}
            </select>
        </div>
    )
}

export default forwardRef(Select);    // for sending ref to forward we can directly write here 