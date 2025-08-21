import React from 'react'
type ButtonVarients='PRIMARY'|'SECONDARY'|'OUTLINE'
const Button = ({
    onClick ,
    varient,
    label,
    type="button",
    disabled
}:{
    onClick?:()=>void 
    varient:ButtonVarients
    label:string
    type?:"button" | "submit" | "reset" 
    disabled?:boolean

}) => {
    const className =
    varient === "PRIMARY"
      ? "bg-[#261d56] text-white"
      : varient === "OUTLINE"
      ? ""
      : "";
  
  return (
      <button
        onClick={() =>onClick && onClick()}
        type={type}
        disabled={disabled}
        className={`
    text-gray-900 font-sans px-4 py-2 w-full rounded
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `}
      >
        {label}
      </button>
  )
}

export default Button
