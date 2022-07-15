import { FormEvent } from "react";
import styles from "./Button.module.scss";

export type ButtonProps = {
  text?: string;
  type: "submit" | "reset" | "button";
  variant?: "primary" | "secondary" | "danger";
  imgSrc?: string;
  onClick?: (
    event: FormEvent
  ) => void | (() => void) | ((type: string) => void);
  className?: string;
};

const Button = ({
  text,
  type,
  onClick,
  variant = "primary",
  imgSrc,
  className = "",
}: ButtonProps) => {
  const classNames = imgSrc
    ? `${styles.imgButton} ${className}`
    : `${styles[variant]} ${className}`;

  return (
    <button className={classNames} type={type} onClick={onClick}>
      {imgSrc ? <img src={imgSrc} /> : text}
    </button>
  );
};

export default Button;
