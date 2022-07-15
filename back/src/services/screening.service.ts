import { ScreeningInput, ScreeningOutput } from "../models/Screening";
import { SeatInput } from "../models/Seat";
import * as screeningRepository from "../repositories/screening.repository";
import * as seatRepository from "../repositories/seat.repository";
import alphabet from "../utils/alphabet";

export const getAllScreenings = async (): Promise<ScreeningOutput[]> => {
  const screenings = await screeningRepository.getAllScreenings();
  return screenings;
};

export const getScreeningById = async (
  screeningId: number
): Promise<ScreeningOutput | null> => {
  const screening = await screeningRepository.getScreeningById(screeningId);
  return screening;
};

export const createScreening = async (
  screeningInput: ScreeningInput
): Promise<ScreeningOutput> => {
  const createdScreening = await screeningRepository.createScreening(
    screeningInput
  );
  for (let row = 0; row < screeningInput.seatRows; row++) {
    for (let column = 0; column < screeningInput.seatColumns; column++) {
      const newSeat: SeatInput = {
        isAvailable: true,
        position: `${alphabet[row]}${column + 1}`,
        ScreeningId: createdScreening.id,
      };
      seatRepository.createSeat(newSeat);
    }
  }
  return createdScreening;
};

// export const updateScreening = async (ScreeningInput: ScreeningInput): Promise<any> => {
//   return await screeningRepository.updateScreening(ScreeningInput);
// };

// export const deleteScreening = async (ScreeningId: number): Promise<number> => {
//   return await screeningRepository.deleteScreening(ScreeningId);
// };
