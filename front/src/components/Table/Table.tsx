import styles from "./Table.module.scss";

type TableProps = {
  headers: string[];
  items: Record<string, unknown>[];
  itemOnSelect: (id: number, name: string) => void;
  selectedItem?: number;
};

const Table = ({ items, headers, itemOnSelect, selectedItem }: TableProps) => (
  <>
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>No.</th>
            {headers.map((header) => (
              <th key={header} className={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item: any, index: number) => (
            <tr
              className={
                selectedItem === item[headers[0]]
                  ? styles.selectedRow
                  : styles.row
              }
              key={item[headers[0]]}
              onClick={() => itemOnSelect(item[headers[0]], item[headers[1]])}
            >
              <td className={styles.td}>
                <b>{index + 1}</b>
              </td>
              {headers.map((header) => (
                <td key={header} className={styles.td}>{`${item[header]}`}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);
export default Table;
