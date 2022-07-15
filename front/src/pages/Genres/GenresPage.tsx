import { useEffect, useState } from "react";
import Heading from "../../components/shared/Heading/Heading";
import genreService from "../../services/Genre.service";
import Table from "../../components/Table/Table";
import Button from "../../components/shared/Button/Button";
import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import addGenreFormData from "./GenrePageData";
import { editGenreFormData } from "./GenrePageData";
import { MessageProps } from "../../components/shared/Message/Message";
import styles from "./GenrePage.module.scss";

const GenresPage = () => {
  const headers: string[] = ["id", "name"];
  const [selectedGenre, setSelectedGenre] = useState<Genre>({
    id: 0,
    name: "",
  });
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<MessageProps>({
    message: "",
    type: "success",
  });

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
    }
  };

  const selectGenre = (id: number, name: string) => {
    setSelectedGenre({ id: id, name: name });
  };

  const checkSelectedGenre = (type: string) => {
    if (genres.length === 0) {
      alert("There are no genres!");
      selectGenre(0, "");
      return;
    }
    if (selectedGenre.id === 0) alert("You didn't select a genre!");
    else changeModalState(type);
  };

  const deleteSelectedGenre = () => {
    if (selectedGenre.id)
      genreService
        .deleteGenreById(selectedGenre.id)
        .then(() => {
          selectGenre(0, "");
          const itemIndex = genres.findIndex(
            (genre: Genre) => genre.id === selectedGenre.id
          );
          if (itemIndex !== -1) {
            genres.splice(itemIndex, 1);
          }
        })
        .catch((error) => console.log(error));
    changeModalState("delete");
  };

  useEffect(() => {
    genreService
      .getAllGenres()
      .then((gotGenres) => {
        setGenres(gotGenres);
      })
      .catch((error) => console.log(error));
  }, []);

  const createGenre = (newGenre: Record<string, unknown>) => {
    genreService
      .createGenre(newGenre)
      .then((result: Genre) => {
        setStatusMessage({
          message: `Added genre: "${result.name}"`,
          type: "success",
        });
        genres.push(newGenre as Genre);
      })
      .catch((error) =>
        setStatusMessage({
          message: error.response.data,
          type: "error",
        })
      );
  };

  const editGenre = (newGenre: Record<string, unknown>) => {
    if (!newGenre.name) {
      setStatusMessage({
        message: `You must enter a genre name!`,
        type: "error",
      });
      return;
    }
    genreService
      .editGenreById({ id: selectedGenre.id, name: newGenre.name })
      .then(() => {
        setStatusMessage({
          message: `Edited genre successfully!`,
          type: "success",
        });
        setSelectedGenre({
          id: selectedGenre.id,
          name: newGenre.name as string,
        });
        const itemIndex = genres.findIndex(
          (genre: Genre) => genre.id === selectedGenre.id
        );
        genres[itemIndex].name = newGenre.name as string;
      })
      .catch((error) =>
        setStatusMessage({
          message: error.response.data,
          type: "error",
        })
      );
  };

  return (
    <>
      <Heading size="h2" text="All genres" />
      <Table
        selectedItem={selectedGenre.id}
        items={genres}
        headers={headers}
        itemOnSelect={selectGenre}
      />

      <Button
        text="Add genre"
        type="button"
        onClick={() => changeModalState("create")}
        variant="primary"
        className={styles.addBtn}
      />
      <Button
        text="Edit selected genre"
        type="button"
        onClick={() => checkSelectedGenre("edit")}
        variant="secondary"
        className={styles.editBtn}
      />
      <Button
        text="Delete selected genre"
        type="button"
        variant="danger"
        onClick={() => checkSelectedGenre("delete")}
        className={styles.deleteBtn}
      />
      <Modal
        content={
          <Form
            headingData={addGenreFormData.headingData}
            inputs={addGenreFormData.inputs}
            buttonData={addGenreFormData.buttonData}
            statusMessage={statusMessage}
            submitMethod={createGenre}
          />
        }
        isOpenModal={isCreateModalOpen}
        changeModalState={() => changeModalState("create")}
      />
      <Modal
        content={
          <>
            <Heading
              size="h3"
              text="Are you sure you want to delete the genre?"
            />
            <Button
              type="button"
              text="Confirm deletion"
              onClick={deleteSelectedGenre}
              className={styles.confirmDeletionBtn}
              variant="danger"
            />
          </>
        }
        isOpenModal={isDeleteModalOpen}
        changeModalState={() => changeModalState("delete")}
      />
      <Modal
        content={
          <Form
            headingData={editGenreFormData.headingData}
            inputs={editGenreFormData.inputs}
            buttonData={editGenreFormData.buttonData}
            statusMessage={statusMessage}
            submitMethod={editGenre}
          />
        }
        isOpenModal={isEditModalOpen}
        changeModalState={() => changeModalState("edit")}
      />
    </>
  );
};
export default GenresPage;
