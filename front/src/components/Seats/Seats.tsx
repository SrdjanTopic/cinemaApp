import styles from "./Seats.module.scss";
import alphabet from "./SeatsData";

export type SeatsProps = {
  seatOnSelect: (seatId: number) => void;
  selectedSeats: number[];
  seatRows: number;
  seatColumns: number;
  seats: Seat[];
};

const Seats = ({
  seatColumns,
  seatOnSelect,
  seatRows,
  selectedSeats,
  seats,
}: SeatsProps) => (
  <>
    <div className={styles.wrapper}>
      <table className={styles.seatsTable}>
        <thead>
          <tr>
            {Array.from(Array(seatColumns + 1), (e, i) => {
              return (
                <th key={i} className={styles.numbers}>
                  {i}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from(Array(seatRows), (e, i) => (
            <tr key={i}>
              {Array.from(Array(seatColumns + 1), (e, j) =>
                j === 0 ? (
                  <td className={styles.alphabet}>{alphabet[i]}</td>
                ) : (
                  <td
                    key={seats[i * seatColumns + j - 1].id}
                    className={styles.seat}
                  >
                    <div
                      onClick={
                        seats[i * seatColumns + j - 1].isAvailable
                          ? () =>
                              seatOnSelect(seats[i * seatColumns + j - 1].id)
                          : undefined
                      }
                      className={`${styles.seatDiv} ${
                        selectedSeats.includes(
                          seats[i * seatColumns + j - 1].id
                        )
                          ? styles.selectedSeat
                          : seats[i * seatColumns + j - 1].isAvailable
                          ? styles.availableSeat
                          : styles.occupiedSeat
                      }`}
                    >
                      {seats[i * seatColumns + j - 1].position}
                    </div>
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);
export default Seats;
