import { Genre, Movie } from "../models";
import { GenreInput, GenreOutput } from "../models/Genre";

export const getAllGenres = async (): Promise<GenreOutput[]> => {
  return Genre.findAll({ include: { model: Movie, as: "movies" } });
};

export const getGenreByName = async (
  genreName: string
): Promise<GenreOutput | null> => {
  const genre = Genre.findOne({ where: { name: genreName } });
  return genre;
};

export const getGenreById = async (
  genreId: number
): Promise<GenreOutput | null> => {
  const genre = Genre.findOne({ where: { id: genreId } });
  return genre;
};

export const createGenre = async (
  genreInput: GenreInput
): Promise<GenreOutput> => {
  return Genre.create(genreInput);
};

export const deleteGenreById = async (id: number): Promise<Boolean> => {
  return !!Genre.destroy({
    where: { id: id },
  });
};

export const updateGenreByName = async (
  newGenreName: string,
  oldGenreName: string
): Promise<any> => {
  return Genre.update(
    {
      name: newGenreName,
    },
    {
      where: { name: oldGenreName },
    }
  );
};

export const updateGenreById = async (newGenre: GenreInput): Promise<any> => {
  return Genre.update(
    {
      name: newGenre.name,
    },
    {
      where: { id: newGenre.id },
    }
  );
};
