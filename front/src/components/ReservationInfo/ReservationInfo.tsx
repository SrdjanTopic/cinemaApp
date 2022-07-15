import styles from "./ReservationInfo.module.scss";

type ReservationInfoProps = {
  id: number;
  reservation?: Reservation;
  onCancelReservation?: (id: number) => void;
};

const ReservationInfo = ({
  id,
  reservation,
  onCancelReservation,
}: ReservationInfoProps) => {
  console.log(reservation);
  return (
    <>
      <div className={styles.reservationInfoCardWrapper}>
        <div className={styles.movieInfoWrapper}>
          <div className={styles.borderDiv}>
            <div className={styles.imageDiv}>
              <img
                src={reservation?.Screening?.Movie.image}
                alt="Movie image"
              />
            </div>
          </div>
          <div className={styles.infoDiv}>
            <p className={styles.title}>Name:</p>
            <p className={styles.text}>{reservation?.Screening?.Movie.name}</p>
            <p className={styles.title}>Duration: </p>
            <p className={styles.text}>
              {reservation?.Screening?.Movie.duration} minutes
            </p>
          </div>
        </div>
        <div className={styles.screeningInfoWrapper}>
          <div className={styles.borderDiv}>
            <div className={styles.infoDiv}>
              <p className={styles.title}>Date and time:</p>
              <p className={styles.text}>
                {reservation?.Screening?.dateAndTime
                  .toString()
                  .slice(0, 16)
                  .replace("T", " ")}
                h
              </p>
              <p className={styles.title}>Seats: </p>
              <p className={styles.text}>
                {reservation?.Seats?.map((seat) => `${seat.position} `)}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.recieptInfoWrapper}>
          <div className={styles.borderDiv}>
            <div className={styles.infoDiv}>
              <p className={styles.title}>Total price:</p>
              <p className={styles.text}> {reservation?.totalPrice} RSD</p>
              <p className={styles.title}>ID code: </p>
              <p className={styles.text}>{reservation?.identificationCode}</p>
            </div>
          </div>
        </div>
        <button
          className={styles.cancelReservationButton}
          onClick={
            onCancelReservation ? () => onCancelReservation(id) : () => {}
          }
        >
          CANCEL RESERVATION
        </button>
      </div>
    </>
  );
};
export default ReservationInfo;
//cadetblue
