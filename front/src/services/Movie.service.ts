import ApiService from "./Api.service";

type CheckInputDataValidation = {
  passed: boolean;
  message: string;
};

const userPath = process.env.REACT_APP_BASE_URL + "/movies";

const getAllMovies = (): Promise<Movie[]> => {
  return ApiService.get(userPath);
};

const getAllMoviesWithScreenings = (date: Date): Promise<Movie[]> => {
  return ApiService.post(userPath + "/screenings", { date: date });
};

const createMovie = (movieData: Record<string, unknown>): Promise<Movie> => {
  return ApiService.post(userPath, movieData);
};

const deleteMovieById = (movieID: number): Promise<boolean> => {
  return ApiService.deleteObjectById(userPath + "/" + movieID);
};

const editMovie = (newMovieData: Record<string, unknown>): Promise<boolean> => {
  return ApiService.put(userPath + "/", newMovieData);
};

const validateMovieInput = (
  movieInputs: Record<string, unknown>,
  fields: string[]
): CheckInputDataValidation => {
  let answer: CheckInputDataValidation = {
    message: "",
    passed: true,
  };
  fields.forEach((field) => {
    switch (field) {
      case "name":
        if (!movieInputs.name) {
          answer.passed = false;
          answer.message = "You must fill the 'Name' field";
        }
        break;
      case "releaseYear":
        if (!movieInputs.releaseYear) {
          answer.passed = false;
          answer.message = "You must fill the 'Release Year' field";
        }
        break;
      case "duration":
        if (!movieInputs.duration) {
          answer.passed = false;
          answer.message = "You must fill the 'Duration' field";
        } else if ((movieInputs.duration as number) < 1) {
          answer.passed = false;
          answer.message = "Duration cannot be les than '1'";
        }
        break;
      case "image":
        if (!movieInputs.image) {
          answer.passed = false;
          answer.message = "You must fill the 'Image' field";
        }
        break;
      case "genres":
        if (!movieInputs.genres || (movieInputs.genres as []).length < 1) {
          answer.passed = false;
          answer.message = "You must select atleast one genre";
        }
        break;
    }
  });
  return answer;
};
const checkCredentialsEdit = (
  credentials: Record<string, unknown>,
  fields: string[]
): CheckInputDataValidation => {
  let answer: CheckInputDataValidation = {
    message: "",
    passed: true,
  };
  let numberOfChanges = 0;
  fields.forEach((field) => {
    switch (field) {
      case "name":
        if (!credentials.name) numberOfChanges++;
        break;
      case "releaseYear":
        if (!credentials.releaseYear) numberOfChanges++;
        break;
      case "duration":
        if (!credentials.duration) numberOfChanges++;
        else if ((credentials.duration as number) < 1) {
          answer.passed = false;
          answer.message = "Duration cannot be les than '1'";
        }
        break;
      case "image":
        if (!credentials.image) numberOfChanges++;
        break;
      case "genres":
        if (!credentials.genres || (credentials.genres as []).length < 1)
          numberOfChanges++;
        break;
    }
  });
  if (numberOfChanges === 5) {
    answer.passed = false;
    answer.message = "You didn't make any changes!";
  }
  return answer;
};

const movieService = {
  getAllMovies,
  createMovie,
  deleteMovieById,
  editMovie,
  validateMovieInput,
  checkCredentialsEdit,
  getAllMoviesWithScreenings,
};

export default movieService;
