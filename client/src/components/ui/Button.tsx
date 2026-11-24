import "./button.css";
import type { IButtonProps } from "../../types/uiTypes";

function Button({ children, type = "button", className = "", ...props }: IButtonProps) {
    return <button type={type} className={`button ${className}`} {...props}>{children}</button>;
}

export default Button;
