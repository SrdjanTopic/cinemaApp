import { v4 as uuidv4 } from "uuid";

import ReservationDTO from "../dtos/reservationDTO";
import { ReservationInput, ReservationOutput } from "../models/Reservation";
import { SeatInput } from "../models/Seat";
import * as reservationRepository from "../repositories/reservation.repository";
import * as seatRepository from "../repositories/seat.repository";
import * as userRepository from "../repositories/user.repository";
import { sendReservationEmail } from "../utils/mailSender";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getAllReservations = async (): Promise<ReservationOutput[]> => {
  return await reservationRepository.getAllReservations();
};

export const getReservationById = async (
  id: number
): Promise<ReservationOutput | null> => {
  return await reservationRepository.getReservationById(id);
};

export const createReservation = async (
  newReservation: ReservationDTO
): Promise<ReservationOutput | null> => {
  const user = await userRepository.getUserByEmail(newReservation.email);
  const reservationInput: ReservationInput = {
    isDiscounted: newReservation.isDiscounted,
    numberOfTickets: newReservation.numberOfTickets,
    ScreeningId: newReservation.screeningId,
    UserId: user !== null ? user.id : undefined,
    totalPrice: newReservation.totalPrice,
    email: newReservation.email,
    identificationCode: uuidv4(),
  };
  const createdReservation = await reservationRepository.createReservation(
    reservationInput
  );
  if (createdReservation) {
    newReservation.seats.forEach(async (seatId) => {
      const seatInput: SeatInput = {
        isAvailable: false,
        id: seatId,
        ReservationId: createdReservation.id,
      };
      await seatRepository.updateSeat(seatInput);
    });
    let rese: ReservationOutput | null = null;
    sleep(1000).then(async () => {
      rese = await reservationRepository.getReservationById(
        createdReservation.id
      );
      if (rese !== null) sendReservationEmail(rese, user);
    });
    return createdReservation;
  } else return null;
};

export const cancelReservationById = async (
  reservationId: number
): Promise<number> => {
  const reservation = await reservationRepository.getReservationById(
    reservationId
  );
  if (reservation) {
    reservation.Seats?.forEach(async (seat) => {
      const seatInput: SeatInput = {
        isAvailable: true,
        id: seat.id,
        ReservationId: null,
      };
      await seatRepository.updateSeat(seatInput);
    });
  }
  return await reservationRepository.deleteReservationById(reservationId);
};
