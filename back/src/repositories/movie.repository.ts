import sequelizeConnection from "../config";
import { Genre, Movie, Screening } from "../models";
import { MovieInput, MovieOutput } from "../models/Movie";

export const getAllMovies = async (): Promise<MovieOutput[]> => {
  const movies = await Movie.findAll({
    include: [{ model: Genre, as: "genres" }],
  });
  return movies;
};

export const getAllMoviesWithScreenings = async (): Promise<MovieOutput[]> => {
  const movies = await Movie.findAll({
    include: [
      { model: Genre, as: "genres" },
      {
        model: Screening,
      },
    ],
  });
  return movies;
};

export const getMovieById = async (
  movieId: number
): Promise<MovieOutput | null> => {
  const movie = Movie.findByPk(movieId);
  return movie;
};

export const createMovie = async (
  movieInput: MovieInput
): Promise<MovieOutput | null> => {
  const newMovie = await Movie.create(movieInput);
  const { MovieGenres } = sequelizeConnection.models;
  movieInput.genres?.forEach(async (genre: number) => {
    await MovieGenres.create({ MovieId: newMovie.id, GenreId: genre });
  });

  return await Movie.findOne({
    where: { id: newMovie.id },
    include: { model: Genre, as: "genres" },
  });
};

export const updateMovie = async (
  movieInput: Partial<MovieInput>
): Promise<MovieOutput | null> => {
  const { MovieGenres } = sequelizeConnection.models;

  if (!movieInput.genres || movieInput.genres.length < 1)
    Movie.update(movieInput, { where: { id: movieInput.id } });
  else {
    await MovieGenres.destroy({ where: { MovieId: movieInput.id } });
    movieInput.genres.forEach(async (genre: number) => {
      await MovieGenres.create({ MovieId: movieInput.id, GenreId: genre });
    });
    await Movie.update(movieInput, { where: { id: movieInput.id } });
  }
  return await Movie.findByPk(movieInput.id, {
    include: { model: Genre, as: "genres" },
  });
};

export const deleteMovie = async (movieId: number): Promise<number> => {
  return Movie.destroy({
    where: { id: movieId },
  });
};
