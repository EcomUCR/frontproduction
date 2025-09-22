import type { JSX } from "react";

interface ButtonProps{
    text?:string;
    style?:string;
    icon?:JSX.Element;
    iconStyle?:string;
    onClick?:()=>void;
}
export default function ButtonComponent(props : ButtonProps) {
    const { text, style, icon, iconStyle, onClick } = props;
    return(
        <button className={style} onClick={onClick}>
            {icon && <span className={iconStyle}>{icon}</span>}
            {text}
        </button>
);
}