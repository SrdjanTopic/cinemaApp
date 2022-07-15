import { Router } from "express";
import userRouter from "./user.routes";
import genreRouter from "./genre.routes";
import movieRouter from "./movie.routes";
import screeningRouter from "./screening.routes";
import reservationRouter from "./reservation.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/genres", genreRouter);
router.use("/movies", movieRouter);
router.use("/screenings", screeningRouter);
router.use("/reservations", reservationRouter);

export default router;
