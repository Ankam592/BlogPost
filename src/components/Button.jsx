
import React from "react";

export const Button = ({
    children,
    type = 'submit',
    bgColor = 'bg-black',
    textColor = 'text-white',
    className = '',
    ...props
})=>
{
    return (
        <button type = {type} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

