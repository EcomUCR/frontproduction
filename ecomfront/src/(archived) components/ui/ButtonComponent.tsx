interface ButtonComponentProps{
    text?: string;
    style: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
    iconStyle?: string;
}
export default function ButtonComponent(props: ButtonComponentProps){
    return(
        <button
            className={props.style}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.icon && <props.icon className={props.iconStyle} />}
            {props.text}
        </button>
    );
}