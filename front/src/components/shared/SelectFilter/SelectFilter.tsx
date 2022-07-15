import styles from "./SelectFilter.module.scss";

type SelectFilterProps = {
  optionValues: string[];
  onChange: (filter: string) => void;
};

const SelectFilter = ({ optionValues, onChange }: SelectFilterProps) => {
  return (
    <div className={styles.selectWrapper}>
      <select
        className={styles.select}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled selected hidden>
          Choose genre to filter
        </option>
        <option value="none">None</option>
        {optionValues.map((value) => (
          <option value={value} className={styles.option}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SelectFilter;
