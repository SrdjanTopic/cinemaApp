import { weekday } from "../../utils/dateFunctions";
import styles from "./TopFilter.module.scss";

type TopFilterProps = {
  type: "days" | "letters";
  days?: Date[];
  alphabet?: string[];
  selected: boolean[];
  onClickSelect: (id: number) => void;
};
const TopFilter = ({
  type,
  days,
  alphabet,
  selected,
  onClickSelect,
}: TopFilterProps) => {
  switch (type) {
    case "days": {
      return (
        <div className={styles.daysWrapper}>
          {days?.map((day, index) => (
            <div
              className={
                selected[index] ? styles.dateFilterSelected : styles.dateFilter
              }
              onClick={!selected[index] ? () => onClickSelect(index) : () => {}}
            >{`${
              weekday[day.getDay()]
            } ${day.getDate()}.${day.getMonth()}`}</div>
          ))}
        </div>
      );
    }
    default:
      return (
        <div className={styles.daysWrapper}>
          {alphabet?.map((letter, index) => (
            <div
              className={
                selected[index]
                  ? styles.letterFilterSelected
                  : styles.letterFilter
              }
              onClick={() => onClickSelect(index)}
            >
              {letter}
            </div>
          ))}
        </div>
      );
  }
};
export default TopFilter;
