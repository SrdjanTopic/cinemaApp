import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import ReservationInfo from "../../components/ReservationInfo/ReservationInfo";
import Heading from "../../components/shared/Heading/Heading";
import reservationService from "../../services/Reservation.service";
import userService from "../../services/User.service";

const ActiveReservationsPage = () => {
  const [user, setUser] = useState<User>();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const loggedInUser: any = jwt_decode(token);
      userService
        .getUserByEmail(loggedInUser.email)
        .then((gotUser) => {
          gotUser.Reservations?.sort(
            (a, b) =>
              new Date(
                a.Screening ? a.Screening.dateAndTime : Date()
              ).getTime() -
              new Date(b.Screening ? b.Screening.dateAndTime : Date()).getTime()
          );
          setUser(gotUser);
          setReservations(gotUser.Reservations ? gotUser.Reservations : []);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const onCancelReservation = (id: number) => {
    reservationService.cancelReservationById(id);
    const res = reservations.slice(id, 1);
    setReservations(res);
  };

  if (user)
    return (
      <>
        <Heading size="h2" text="Active reservations" />
        {reservations.map((reservation) => (
          <ReservationInfo
            onCancelReservation={onCancelReservation}
            id={reservation.id ? reservation.id : 0}
            reservation={reservation}
          />
        ))}
      </>
    );
  else return <></>;
};
export default ActiveReservationsPage;
