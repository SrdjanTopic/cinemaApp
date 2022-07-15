import ReservationDTO from "../dtos/reservationDTO";
import { ReservationInput, ReservationOutput } from "../models/Reservation";
import * as reservationService from "../services/reservation.service";

export const getAllReservations = async (): Promise<ReservationOutput[]> => {
  return await reservationService.getAllReservations();
};

export const getReservationById = async (
  ReservationId: number
): Promise<ReservationOutput | null> => {
  return await reservationService.getReservationById(ReservationId);
};

export const createReservation = async (
  reservationInput: ReservationDTO
): Promise<ReservationOutput | null> => {
  return await reservationService.createReservation(reservationInput);
};

// export const updateScreening = async (screeningInput: ScreeningInput) => {
//   return screeningService.updateScreening(screeningInput);
// };

export const cancelReservationById = async (
  reservationId: number
): Promise<number> => {
  return await reservationService.cancelReservationById(reservationId);
};
