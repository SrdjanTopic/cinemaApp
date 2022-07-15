import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./Select.module.scss";

type SelectProps = {
  label: string;
  name: string;
  id: string;
  options?: any[];
  onSelectChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Select = ({ label, name, options, onSelectChange }: SelectProps) => {
  const [expandSelect, setExpandSelect] = useState<boolean>(false);

  return (
    <div className={styles.selectWrapper}>
      <Button
        className={styles.expandButton}
        type="button"
        text={label}
        variant="secondary"
        onClick={() => setExpandSelect(!expandSelect)}
      />
      <div className={styles.optionsWrapper}>
        {options?.map((option, index: number) => (
          <>
            <label
              className={
                expandSelect
                  ? styles.optionLabelDisplay
                  : styles.optionLabelDisplayNone
              }
            >
              {option.name}
              <input
                key={option.id}
                id={option.id}
                name={name}
                value={option.id}
                type="checkbox"
                onChange={onSelectChange}
              />
            </label>
            {(index + 1) % 3 == 0 ? (
              <div key={`div${option.id}`} className={styles.newRowDiv} />
            ) : (
              <></>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
export default Select;
