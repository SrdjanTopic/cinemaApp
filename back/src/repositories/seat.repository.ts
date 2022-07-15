import { Seat } from "../models";
import { SeatInput, SeatOutput } from "../models/Seat";

export const createSeat = async (seatInput: SeatInput): Promise<SeatOutput> => {
  return Seat.create(seatInput);
};

export const updateSeat = async (seatInput: SeatInput): Promise<void> => {
  Seat.update(seatInput, { where: { id: seatInput.id } });
};
