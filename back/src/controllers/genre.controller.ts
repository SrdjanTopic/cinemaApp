import { GenreInput, GenreOutput } from "../models/Genre";
import * as genreService from "../services/genre.service";

export const getAllGenres = async (): Promise<GenreOutput[]> => {
  return await genreService.getAllGenres();
};

export const getGenreByName = async (
  genreName: string
): Promise<GenreOutput | null> => {
  const genre = await genreService.getGenreByName(genreName);
  return genre;
};

export const createGenre = async (
  genreInput: GenreInput
): Promise<GenreOutput> => {
  return await genreService.createGenre(genreInput);
};

export const deleteGenreById = async (id: number): Promise<Boolean> => {
  return await genreService.deleteGenreById(id);
};

export const updateGenreByName = async (
  newGenreName: string,
  oldGenreName: string
): Promise<string> => {
  return await genreService.updateGenreByName(newGenreName, oldGenreName);
};

export const updateGenreById = async (
  newGenre: GenreInput
): Promise<string> => {
  return await genreService.updateGenreById(newGenre);
};
