import { ChangeEvent } from "react";
import Select from "../Select/Select";
import styles from "./Input.module.scss";

export type InputProps = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  type:
    | "text"
    | "password"
    | "file"
    | "select"
    | "date"
    | "number"
    | "email"
    | "datetime-local";
  required: boolean;
  value?: any;
  selectOptions?: unknown[];
  onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  id,
  label,
  name,
  placeholder,
  type,
  required,
  selectOptions,
  onInputChange,
  value,
}: InputProps) => {
  if (type === "select")
    return (
      <Select
        id={id}
        label={label}
        name={name}
        options={selectOptions}
        onSelectChange={onInputChange}
      />
    );
  else
    return (
      <div className={styles.inputWrap}>
        <label className={styles.label}>{label}</label>
        <input
          className={type !== "file" ? styles.input : styles.fileInput}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onInputChange}
          required={required}
          value={value}
          pattern={
            type === "password"
              ? "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,64}$"
              : ".+"
          }
          title={
            type === "password"
              ? "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              : ""
          }
        />
      </div>
    );
};

export default Input;
