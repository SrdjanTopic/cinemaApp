import { Router } from "express";
import { toNumber } from "lodash";
import * as movieController from "../controllers/movie.controller";
import auth from "../middleware/auth/authJwt";
import { MovieInput } from "../models/Movie";
import { ROLE } from "../models/Role";
import STATUS_CODE from "../utils/statusCodes";

const movieRouter = Router();

movieRouter.get(
  "/",
  auth.authenticateToken,
  auth.authorizeToken([ROLE.Administrator]),
  async (req, res) => {
    //get all movies
    const movies = await movieController.getAllMovies();
    res.status(STATUS_CODE.OK).send(movies);
  }
);

movieRouter.post("/screenings", async (req, res) => {
  //get all movies
  const date = req.body;
  const movies = await movieController.getAllMoviesWithScreenings(date.date);
  res.status(STATUS_CODE.OK).send(movies);
});

movieRouter.get("/:id", async (req, res) => {
  //get movie by id
  try {
    const movie = await movieController.getMovieById(toNumber(req.params.id));
    if (movie === null) {
      res.status(STATUS_CODE.NOT_FOUND).send("Not found");
    } else {
      res.status(STATUS_CODE.OK).send(movie);
    }
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Server problem");
  }
});

movieRouter.put("/", async (req, res) => {
  // update movie by id
  const movieInput = req.body;
  try {
    const affectedMovie = await movieController.updateMovie(movieInput);
    if (affectedMovie === null) {
      res.status(STATUS_CODE.NOT_FOUND).send("Not found");
    } else {
      res.status(STATUS_CODE.OK).send(affectedMovie);
    }
  } catch (err) {}
});

movieRouter.delete("/:id", async (req, res) => {
  try {
    const deletedMovies = await movieController.deleteMovie(
      toNumber(req.params.id)
    );
    if (deletedMovies > 0) {
      res
        .status(STATUS_CODE.OK)
        .send(`deleted movie with id: ${req.params.id}`);
    } else {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .send(`movie not found with ID: ${req.params.id}`);
    }
  } catch (err: any) {
    res.status(500).send(err.errors[0].message);
  }
});

movieRouter.post("/", async (req, res) => {
  // create movie
  const movieInput: MovieInput = req.body;
  try {
    const createdMovie = await movieController.createMovie(movieInput);
    res.status(STATUS_CODE.CREATED).send(createdMovie);
  } catch (err: any) {
    res.status(STATUS_CODE.CONFLICT).send(err.errors[0].message);
  }
});

export default movieRouter;
