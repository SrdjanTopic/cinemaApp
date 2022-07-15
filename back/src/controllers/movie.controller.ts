import { MovieInput, MovieOutput } from "../models/Movie";
import * as movieService from "../services/movie.service";

export const getAllMovies = async (): Promise<MovieOutput[]> => {
  return await movieService.getAllMovies();
};

export const getAllMoviesWithScreenings = async (
  date: Date
): Promise<MovieOutput[]> => {
  return await movieService.getAllMoviesWithScreenings(date);
};

export const getMovieById = async (
  movieId: number
): Promise<MovieOutput | null> => {
  const genre = await movieService.getMovieById(movieId);
  return genre;
};

export const createMovie = async (
  movieInput: MovieInput
): Promise<MovieOutput | null> => {
  return movieService.createMovie(movieInput);
};

export const updateMovie = async (
  movieInput: MovieInput
): Promise<MovieOutput | null> => {
  return await movieService.updateMovie(movieInput);
};

export const deleteMovie = async (movieId: number): Promise<number> => {
  return await movieService.deleteMovie(movieId);
};
