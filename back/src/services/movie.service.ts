import { Screening } from "../models";
import { MovieInput, MovieOutput } from "../models/Movie";
import * as movieRepository from "../repositories/movie.repository";

export const getAllMovies = async (): Promise<MovieOutput[]> => {
  const movies = await movieRepository.getAllMovies();
  return movies;
};

export const getAllMoviesWithScreenings = async (
  date: Date
): Promise<MovieOutput[]> => {
  let returnMovies: MovieOutput[] = [];
  const movies = await movieRepository.getAllMoviesWithScreenings();

  movies.forEach((movie) => {
    const sortedScreens = movie.Screenings?.filter(
      (screening) =>
        new Date(screening.dateAndTime).toString().slice(0, 15) ===
        new Date(date).toString().slice(0, 15)
    );

    let movieOutput: MovieOutput = {
      id: movie.id,
      duration: movie.duration,
      image: movie.image,
      name: movie.name,
      releaseYear: movie.releaseYear,
      Screenings: sortedScreens,
      genres: movie.genres,
    };

    if (movieOutput.Screenings && movieOutput.Screenings.length > 0)
      returnMovies.push(movieOutput);
    else {
    }
  });
  return returnMovies;
};

export const getMovieById = async (
  movieId: number
): Promise<MovieOutput | null> => {
  const movie = await movieRepository.getMovieById(movieId);
  return movie;
};

export const createMovie = async (
  movieInput: MovieInput
): Promise<MovieOutput | null> => {
  return await movieRepository.createMovie(movieInput);
};

export const updateMovie = async (
  movieInput: MovieInput
): Promise<MovieOutput | null> => {
  return await movieRepository.updateMovie(movieInput);
};

export const deleteMovie = async (movieId: number): Promise<number> => {
  return await movieRepository.deleteMovie(movieId);
};
