import { GenreInput, GenreOutput } from "../models/Genre";
import * as genreRepository from "../repositories/genre.repository";

export const getAllGenres = async (): Promise<GenreOutput[]> => {
  return await genreRepository.getAllGenres();
};

export const getGenreByName = async (
  genreName: string
): Promise<GenreOutput | null> => {
  return await genreRepository.getGenreByName(genreName);
};

export const createGenre = async (
  genreInput: GenreInput
): Promise<GenreOutput> => {
  return await genreRepository.createGenre(genreInput);
};

export const deleteGenreById = async (id: number): Promise<Boolean> => {
  return await genreRepository.deleteGenreById(id);
};

export const updateGenreByName = async (
  newGenreName: string,
  oldGenreName: string
): Promise<string> => {
  const oldGenre = await genreRepository.getGenreByName(oldGenreName);
  if (oldGenre === null) return "Not found";
  const newGenre = await genreRepository.getGenreByName(newGenreName);
  if (newGenre !== null) {
    console.log(newGenre);
    return "Already exists";
  }
  await genreRepository.updateGenreByName(newGenreName, oldGenreName);
  return "Success";
};

export const updateGenreById = async (
  newGenre: GenreInput
): Promise<string> => {
  const oldGenre = newGenre.id
    ? await genreRepository.getGenreById(newGenre.id)
    : null;
  if (oldGenre === null) return "Not found";
  const newGen = await genreRepository.getGenreByName(newGenre.name);
  if (newGen !== null) {
    return "Already exists";
  }
  await genreRepository.updateGenreById(newGenre);
  return "Success";
};
