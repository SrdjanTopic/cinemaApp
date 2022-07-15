import { Router } from "express";
import { toNumber } from "lodash";
import * as genreController from "../controllers/genre.controller";
import auth from "../middleware/auth/authJwt";
import { GenreInput } from "../models/Genre";
import { ROLE } from "../models/Role";
import STATUS_CODE from "../utils/statusCodes";
const genreRouter = Router();

genreRouter.get("/", async (req, res) => {
  //get all genres
  const genres = await genreController.getAllGenres();
  res.status(STATUS_CODE.OK).send(genres);
});

genreRouter.get("/:name", async (req, res) => {
  //get genre by name
  try {
    const genre = await genreController.getGenreByName(req.params.name);
    if (genre === null) {
      res.status(STATUS_CODE.NOT_FOUND).send("Not found");
    } else {
      res.status(STATUS_CODE.OK).send(genre);
    }
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Server problem");
  }
});

genreRouter.put(
  "/:name",
  auth.authenticateToken,
  auth.authorizeToken([ROLE.Administrator]),
  async (req, res) => {
    // update genre by name
    const genreNames: GenreInput = req.body;
    try {
      console.log(
        genreNames.name.toLowerCase() + req.params.name.toLowerCase()
      );
      const genre = await genreController.updateGenreByName(
        genreNames.name.toLowerCase(),
        req.params.name.toLowerCase()
      );
      switch (genre) {
        case "Not found":
          res
            .status(STATUS_CODE.NOT_FOUND)
            .send(`Genre '${req.params.name}' does not exist!`);
          break;
        case "Already exists":
          res
            .status(STATUS_CODE.CONFLICT)
            .send(`Genre '${genreNames.name}' already exists!`);
          break;
        default:
          res.status(STATUS_CODE.OK).send("Genre editet successfully!");
      }
    } catch (err) {}
  }
);

genreRouter.put(
  "/",
  auth.authenticateToken,
  auth.authorizeToken([ROLE.Administrator]),
  async (req, res) => {
    // update genre by name
    const newGenre: GenreInput = req.body;
    newGenre.name = newGenre.name.toLowerCase();
    try {
      const genre = await genreController.updateGenreById(newGenre);
      switch (genre) {
        case "Not found":
          res
            .status(STATUS_CODE.NOT_FOUND)
            .send(`Genre '${newGenre.name}' does not exist!`);
          break;
        case "Already exists":
          res
            .status(STATUS_CODE.CONFLICT)
            .send(`Genre '${newGenre.name}' already exists!`);
          break;
        default:
          res.status(STATUS_CODE.OK).send("Genre editet successfully!");
      }
    } catch (err) {}
  }
);

genreRouter.delete(
  "/:id",
  auth.authenticateToken,
  auth.authorizeToken([ROLE.Administrator]),
  async (req, res) => {
    // delete genre by ID
    try {
      const deleted = await genreController.deleteGenreById(
        toNumber(req.params.id)
      );
      res
        .status(STATUS_CODE.OK)
        .send(`deleted genre with ID: ${req.params.id}`);
    } catch (err: any) {
      res.status(STATUS_CODE.NOT_FOUND).send(err.errors[0].message);
    }
  }
);

genreRouter.post(
  "/",
  auth.authenticateToken,
  auth.authorizeToken([ROLE.Administrator]),
  async (req, res) => {
    // create genre
    const payload: GenreInput = req.body;
    if (payload.name) {
      payload.name = payload.name.toLowerCase();
      try {
        const createdGenre = await genreController.createGenre(payload);
        res.status(STATUS_CODE.CREATED).send(createdGenre);
      } catch (err: any) {
        res
          .status(STATUS_CODE.CONFLICT)
          .send(`Genre "${payload.name}" already exists`);
      }
    } else res.status(STATUS_CODE.CONFLICT).send(`Genre must have name!`);
  }
);

export default genreRouter;
