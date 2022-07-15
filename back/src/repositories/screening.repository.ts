import { Movie, Seat } from "../models";
import Screening, {
  ScreeningInput,
  ScreeningOutput,
} from "../models/Screening";

export const getAllScreenings = async (): Promise<ScreeningOutput[]> => {
  const movies = Screening.findAll({ include: Movie });
  return movies;
};

export const getScreeningById = async (
  screeningId: number
): Promise<Screening | null> => {
  return Screening.findOne({
    where: { id: screeningId },
    include: [Movie, Seat],
  });
};

export const createScreening = async (
  screeningsInput: ScreeningInput
): Promise<ScreeningOutput> => {
  const newScreening = await Screening.create(screeningsInput, {
    include: Movie,
  });

  return newScreening;
};
