import jwt_decode from "jwt-decode";
import { ChangeEvent, useEffect, useState } from "react";
import reservationService from "../../services/Reservation.service";
import Seats from "../Seats/Seats";
import Button from "../shared/Button/Button";
import Heading from "../shared/Heading/Heading";
import Input from "../shared/Input/Input";
import Message, { MessageProps } from "../shared/Message/Message";
import styles from "./ScreeningView.module.scss";

type ScreeningViewProps = {
  id: number;
  dateAndTime: Date;
  ticketPrice: number;
  seatRows: number;
  seatColumns: number;
  movieId?: number;
  movie: Movie;
  seats: Seat[];
};

const ScreeningView = ({
  id,
  seatRows,
  seatColumns,
  dateAndTime,
  ticketPrice,
  movie,
  seats,
}: ScreeningViewProps) => {
  const token = localStorage.getItem("token");

  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const [seatsProp, setSeatsProp] = useState<Seat[]>(seats);
  useEffect(() => {
    if (token) setLoggedInUser(jwt_decode(token));
  }, []);

  const [statusMessage, setStatusMessage] = useState<MessageProps>({
    message: "",
    type: "success",
  });

  const [ticketNumberStatusMessage, setTicketNumberStatusMessage] =
    useState<MessageProps>({
      message: "",
      type: "success",
    });

  const [reservationInfo, setReservationInfo] = useState<Reservation>({
    screeningId: id,
    email: "",
    isDiscounted: token ? true : false,
    numberOfTickets: 0,
    seats: [],
    totalPrice: 0,
  });

  const selectSeat = (seatId: number) => {
    const selectedSeats = reservationInfo.seats;
    const seatIndex = selectedSeats.findIndex((id) => id === seatId);
    let ticketNumber = reservationInfo.numberOfTickets;
    if (seatIndex !== -1) {
      selectedSeats.splice(seatIndex, 1);
      ticketNumber--;
      setTicketNumberStatusMessage({
        message: "",
        type: "success",
      });
    } else {
      if (selectedSeats.length < 5) {
        selectedSeats.push(seatId);
        ticketNumber++;
        setTicketNumberStatusMessage({
          message: "",
          type: "success",
        });
      } else
        setTicketNumberStatusMessage({
          message: "You cannot select more than 5 seats",
          type: "error",
        });
    }
    setReservationInfo((prevState) => ({
      ...prevState,
      email: loggedInUser.email ? loggedInUser.email : "",
      seats: selectedSeats,
      numberOfTickets: ticketNumber,
      totalPrice: reservationInfo.isDiscounted
        ? ticketNumber * ticketPrice * 0.95
        : ticketNumber * ticketPrice,
    }));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReservationInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const createReservation = () => {
    if (reservationInfo.numberOfTickets === 0)
      setTicketNumberStatusMessage({
        message: "You must select atleast one seat to create a reservation!",
        type: "error",
      });
    else {
      if (token) {
        reservationService
          .createReservation(reservationInfo)
          .then(() => {
            setStatusMessage({
              message: "Reservation successful!",
              type: "success",
            });
            let tempSeats: Seat[] = [];
            seatsProp.forEach((seatProp) => {
              if (reservationInfo.seats.includes(seatProp.id)) {
                tempSeats.push({ ...seatProp, isAvailable: false });
              } else tempSeats.push(seatProp);
            });
            setReservationInfo({
              screeningId: id,
              email: "",
              isDiscounted: token ? true : false,
              numberOfTickets: 0,
              seats: [],
              totalPrice: 0,
            });
            setSeatsProp(tempSeats);
          })
          .catch((err) => console.log(err));
      } else {
        if (reservationInfo.email) {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reservationInfo.email)) {
            reservationService
              .createReservation(reservationInfo)
              .then(() => {
                setStatusMessage({
                  message: "Reservation successful!",
                  type: "success",
                });
                let tempSeats: Seat[] = [];
                seatsProp.forEach((seatProp) => {
                  if (reservationInfo.seats.includes(seatProp.id)) {
                    tempSeats.push({ ...seatProp, isAvailable: false });
                  } else tempSeats.push(seatProp);
                });
                setReservationInfo({
                  screeningId: id,
                  email: "",
                  isDiscounted: token ? true : false,
                  numberOfTickets: 0,
                  seats: [],
                  totalPrice: 0,
                });
                setSeatsProp(tempSeats);
              })
              .catch((err) => console.log(err));
          } else {
            setStatusMessage({
              message:
                "That is not an email. Fill the 'Email' field in a valid format!",
              type: "error",
            });
          }
        } else {
          setStatusMessage({
            message:
              "You are not logged in, please input your email to create a reservation!",
            type: "error",
          });
        }
      }
    }
  };
  return (
    <>
      <Heading size="h2" text="Screening info" />
      {loggedInUser.role === "Administrator" ? (
        <Button
          type="button"
          variant="danger"
          text="DELETE SCREENING"
          className={styles.deleteScreeningButton}
        />
      ) : (
        <></>
      )}
      <div className={styles.screeningViewWrapper}>
        <div className={styles.ticketReservationWrapper}>
          <p className={styles.ticketReservationHead}>Ticket reservation</p>
          <div className={styles.screeningDetails}>
            <p className={styles.screeningDetailsHead}>Screening details</p>
            <p className={styles.screeningDetail}>
              Movie: {`${movie.name} (${movie.releaseYear})`}
            </p>
            <p className={styles.screeningDetail}>
              Date: {dateAndTime.toString().slice(0, 10)}
            </p>
            <p className={styles.screeningDetail}>
              Time: {dateAndTime.toString().slice(-13).slice(0, 5).slice(0, 10)}
              h
            </p>
            <p className={styles.screeningDetail}>
              Ticket price: {ticketPrice} RSD
            </p>
          </div>
          <div className={styles.tickets}>
            <p className={styles.ticketsHead}>Number of tickets:</p>
            <p className={styles.ticketsP}>{reservationInfo.numberOfTickets}</p>
            <p className={styles.ticketsHead}>/5</p>
          </div>
          <div className={styles.ticketMessageDiv}>
            <Message
              message={ticketNumberStatusMessage.message}
              type={ticketNumberStatusMessage.type}
            />
          </div>
          <div className={styles.seatAvailability}>
            <div className={styles.seatAvailable}></div>
            <p className={styles.seatInfo}>Available seats</p>
          </div>
          <div className={styles.seatAvailability}>
            <div className={styles.seatOccupied}></div>
            <p className={styles.seatInfo}>Occupied seats</p>
          </div>
          <div className={styles.seatAvailability}>
            <div className={styles.seatSelected}></div>
            <p className={styles.seatInfo}>Selected seats</p>
          </div>

          <div className={styles.tickets}>
            <p className={styles.ticketsHead}>Total price:</p>
            <p className={styles.ticketsHead}>{reservationInfo.totalPrice}</p>
            <p className={styles.ticketsHead}>RSD</p>
          </div>
          {!token ? (
            <div className={styles.submitDiv}>
              <Input
                id="email"
                label="Email address:"
                type="email"
                name="email"
                placeholder="Input email address"
                required={true}
                onInputChange={onInputChange}
              />
              <Button
                type="submit"
                variant="primary"
                text="Create reservation"
                onClick={createReservation}
              />
              <Message
                message={statusMessage.message}
                type={statusMessage.type}
              />
            </div>
          ) : (
            <>
              <Button
                type="submit"
                variant="primary"
                text="Create reservation"
                onClick={createReservation}
              />
              <Message
                message={statusMessage.message}
                type={statusMessage.type}
              />
            </>
          )}
        </div>
        <div className={styles.seatsWrapper}>
          <div className={styles.projectionScreen}>Projection screen</div>
          <Seats
            seatOnSelect={selectSeat}
            seatColumns={seatColumns}
            seatRows={seatRows}
            seats={seatsProp}
            selectedSeats={reservationInfo.seats}
          />
        </div>
      </div>
    </>
  );
};
export default ScreeningView;
