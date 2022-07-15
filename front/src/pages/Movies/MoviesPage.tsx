import { ReactNode, useEffect, useState } from "react";
import CardView from "../../components/CardView/CardView";
import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal";
import alphabet from "../../components/Seats/SeatsData";
import Button from "../../components/shared/Button/Button";
import Heading from "../../components/shared/Heading/Heading";
import { MessageProps } from "../../components/shared/Message/Message";
import TopFilter from "../../components/TopFilter/TopFilters";
import genreService from "../../services/Genre.service";
import movieService from "../../services/Movie.service";
import screeningService from "../../services/Screening.service";
import addMovieFormData, {
  addScreeningFormData,
  editMovieFormData,
} from "./MoviePageData";
import styles from "./MoviesPage.module.scss";

const MoviesPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAddScreeningModalOpen, setIsAddScreeningModalOpen] =
    useState<boolean>(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number>(0);
  const [selectedMovie, setSelectedMovie] = useState<unknown[]>([]);
  const [statusMessage, setStatusMessage] = useState<MessageProps>({
    message: "",
    type: "success",
  });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<boolean[]>(
    new Array(alphabet.length).fill(false)
  );
  const deleteMovie = (id: number) => {
    setSelectedMovieId(id);
    changeModalState("delete");
  };

  const editMovieModal = (id: number) => {
    setSelectedMovieId(id);
    const movie = movies.find((movie: Movie) => movie.id === id);
    if (movie)
      setSelectedMovie([
        movie.name,
        movie.releaseYear,
        movie.duration,
        movie.image,
      ]);

    changeModalState("edit");
  };

  useEffect(() => {
    movieService
      .getAllMovies()
      .then((gotMovies) => {
        setAllMovies(gotMovies);
        setMovies(gotMovies);
      })
      .catch((error) => console.log(error)); // TODO: Handle catch with setErrorMessage
    genreService
      .getAllGenres()
      .then((gotGenres) => {
        setGenres(gotGenres);
      })
      .catch((error) => console.log(error));
  }, []);

  const addScreeningModal = (id: number) => {
    setSelectedMovieId(id);
    changeModalState("addScreening");
  };

  const changeModalState = (type: string) => {
    switch (type) {
      case "create": {
        setIsCreateModalOpen(!isCreateModalOpen);
        setStatusMessage({
          message: "",
          type: "success",
        });
        break;
      }
      case "delete": {
        setIsDeleteModalOpen(!isDeleteModalOpen);
        break;
      }
      case "edit": {
        setIsEditModalOpen(!isEditModalOpen);
        setStatusMessage({
          message: "",
          type: "success",
        });
        break;
      }
      case "addScreening": {
        setIsAddScreeningModalOpen(!isAddScreeningModalOpen);
        setStatusMessage({
          message: "",
          type: "success",
        });
        break;
      }
    }
  };

  const deleteSelectedMovie = () => {
    movieService
      .deleteMovieById(selectedMovieId)
      .then(() => {
        const index = movies.findIndex(
          (movie: Movie) => movie.id === selectedMovieId
        );
        movies.splice(index, 1);

        setSelectedMovieId(0);
      })
      .catch((error) => console.log(error));
    changeModalState("delete");
  };

  const validateMovieInputs = (movieCredentials: Record<string, unknown>) => {
    const checkCreds = movieService.validateMovieInput(movieCredentials, [
      "genres",
      "image",
      "duration",
      "releaseYear",
      "name",
    ]);
    if (checkCreds.passed) createMovie(movieCredentials);
    else
      setStatusMessage({
        message: checkCreds.message,
        type: "error",
      });
  };

  const checkCredentialsEdit = (movieCredentials: Record<string, unknown>) => {
    const checkCreds = movieService.checkCredentialsEdit(movieCredentials, [
      "genres",
      "image",
      "duration",
      "releaseYear",
      "name",
    ]);
    if (checkCreds.passed) editMovie(movieCredentials);
    else
      setStatusMessage({
        message: checkCreds.message,
        type: "error",
      });
  };

  const createMovie = (movieCredentials: Record<string, unknown>) => {
    movieService
      .createMovie(movieCredentials)
      .then((movie) => {
        setStatusMessage({
          message: "Movie added successfully",
          type: "success",
        });
        movies.push(movie as Movie);
      })
      .catch((error) => console.log(error));
  };

  const addScreening = (screeningInput: Record<string, unknown>) => {
    screeningInput.MovieId = selectedMovieId;
    screeningService
      .createScreening(screeningInput)
      .then((screening) => {
        setStatusMessage({
          message: "Screening added successfully",
          type: "success",
        });
        console.log(screeningInput);
      })
      .catch((error) => console.log(error));
  };

  const editMovie = (movieCredentials: Record<string, unknown>) => {
    movieCredentials.id = selectedMovieId;
    movieService
      .editMovie(movieCredentials)
      .then((movie) => {
        setStatusMessage({
          type: "success",
          message: "Successfully edited movie",
        });
        const itemIndex = movies.findIndex(
          (movie: Movie) => movie.id === movieCredentials.id
        );
        Object.assign(movies[itemIndex], movie);
      })
      .catch((err) => setStatusMessage({ type: "error", message: err }));
  };

  const onClickSelect = (id: number) => {
    let filters: boolean[] = selectedFilter.slice(0, selectedFilter.length);
    filters[id] = !filters[id];
    setSelectedFilter(filters);
    const filteredMovies: Movie[] = allMovies.slice(0, allMovies.length);
    let filterLetters: string[] = [];
    filters.forEach((filter, index) =>
      filter ? filterLetters.push(alphabet[index]) : {}
    );
    if (filterLetters.length > 0) {
      setMovies(
        filteredMovies.filter((movie) =>
          filterLetters.includes(movie.name[0].toUpperCase())
        )
      );
    } else setMovies(allMovies);
  };

  const createModalContent: ReactNode = (
    <Form
      headingData={addMovieFormData.headingData}
      inputs={addMovieFormData.inputs.concat({
        id: "genre",
        label: "Select movie genre",
        name: "genres",
        placeholder: "Select genre",
        required: true,
        type: "select",
        selectOptions: genres,
      })}
      buttonData={addMovieFormData.buttonData}
      statusMessage={statusMessage}
      submitMethod={validateMovieInputs}
    />
  );
  const deleteModalContent: ReactNode = (
    <>
      <Heading size="h3" text="Are you sure you want to delete the movie?" />
      <Button
        type="button"
        text="Confirm deletion"
        onClick={deleteSelectedMovie}
        className={styles.confirmDeletionBtn}
        variant="danger"
      />
    </>
  );
  const editModalContent: ReactNode = (
    <Form
      headingData={editMovieFormData.headingData}
      inputs={addMovieFormData.inputs.concat({
        id: "genre",
        label: "Select movie genre",
        name: "genres",
        placeholder: "Select genre",
        required: true,
        type: "select",
        selectOptions: genres,
      })}
      values={selectedMovie}
      buttonData={editMovieFormData.buttonData}
      statusMessage={statusMessage}
      submitMethod={checkCredentialsEdit}
    />
  );
  const addScreeningModalContent: ReactNode = (
    <Form
      headingData={addScreeningFormData.headingData}
      inputs={addScreeningFormData.inputs}
      buttonData={addScreeningFormData.buttonData}
      statusMessage={statusMessage}
      submitMethod={addScreening}
    />
  );

  return (
    <>
      <Heading size="h2" text="All movies" />
      <Button
        text="Add movie"
        type="button"
        variant="primary"
        onClick={() => changeModalState("create")}
      />
      <TopFilter
        onClickSelect={onClickSelect}
        type="letters"
        alphabet={alphabet}
        selected={selectedFilter}
      />
      <CardView
        movieCards={movies}
        onClickDelete={deleteMovie}
        onClickEdit={editMovieModal}
        onClickAddScreening={addScreeningModal}
      />
      <Modal
        content={createModalContent}
        isOpenModal={isCreateModalOpen}
        changeModalState={() => changeModalState("create")}
      />
      <Modal
        content={deleteModalContent}
        isOpenModal={isDeleteModalOpen}
        changeModalState={() => changeModalState("delete")}
      />

      <Modal
        content={editModalContent}
        isOpenModal={isEditModalOpen}
        changeModalState={() => changeModalState("edit")}
      />

      <Modal
        content={addScreeningModalContent}
        isOpenModal={isAddScreeningModalOpen}
        changeModalState={() => changeModalState("addScreening")}
      />
    </>
  );
};
export default MoviesPage;
