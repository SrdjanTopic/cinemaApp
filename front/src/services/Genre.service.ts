import ApiService from "./Api.service";

const userPath = process.env.REACT_APP_BASE_URL + "/genres";

const getAllGenres = (): Promise<Genre[]> => {
  return ApiService.get(userPath);
};

const createGenre = (genreData: Record<string, unknown>): Promise<Genre> => {
  return ApiService.post(userPath, genreData);
};

const deleteGenreById = (genreID: number): Promise<boolean> => {
  return ApiService.deleteObjectById(userPath + "/" + genreID);
};

const editGenreByName = (
  newGenreData: Record<string, unknown>,
  oldGenreData: string
): Promise<boolean> => {
  return ApiService.put(userPath + "/" + oldGenreData, newGenreData);
};

const editGenreById = (
  newGenreData: Record<string, unknown>
): Promise<boolean> => {
  return ApiService.put(userPath + "/", newGenreData);
};

const genreService = {
  getAllGenres,
  createGenre,
  deleteGenreById,
  editGenreByName,
  editGenreById,
};

export default genreService;
