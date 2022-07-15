import { Reservation, Seat } from "../models";
import { ReservationInput, ReservationOutput } from "../models/Reservation";

export const getAllReservations = async (): Promise<ReservationOutput[]> => {
  return Reservation.findAll({ include: { model: Seat } });
};

export const getReservationById = async (
  id: number
): Promise<ReservationOutput | null> => {
  return Reservation.findOne({ where: { id: id }, include: [Seat] });
};

export const createReservation = async (
  reservationInput: ReservationInput
): Promise<ReservationOutput | null> => {
  const createdReservation = await Reservation.create(reservationInput);
  return await Reservation.findOne({
    where: { id: createdReservation.id },
    include: { model: Seat },
  });
};

export const deleteReservationById = async (id: number): Promise<number> => {
  return Reservation.destroy({
    where: { id: id },
  });
};
