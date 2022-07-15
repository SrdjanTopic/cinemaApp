import { ScreeningInput, ScreeningOutput } from "../models/Screening";
import * as screeningService from "../services/screening.service";

export const getAllScreenings = async (): Promise<ScreeningOutput[]> => {
  return await screeningService.getAllScreenings();
};

export const getScreeningById = async (
  screeningId: number
): Promise<ScreeningOutput | null> => {
  const genre = await screeningService.getScreeningById(screeningId);
  return genre;
};

export const createScreening = async (
  screeningInput: ScreeningInput
): Promise<ScreeningOutput | null> => {
  return screeningService.createScreening(screeningInput);
};

// export const updateScreening = async (screeningInput: ScreeningInput) => {
//   return screeningService.updateScreening(screeningInput);
// };

// export const deleteScreening = async (screeningId: number): Promise<number> => {
//   return await screeningService.deleteScreening(screeningId);
// };
