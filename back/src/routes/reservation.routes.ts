import { Router } from "express";
import { toNumber } from "lodash";
import * as reservationController from "../controllers/reservation.controller";
import ReservationDTO from "../dtos/reservationDTO";
import auth from "../middleware/auth/authJwt";
import { ROLE } from "../models/Role";
import STATUS_CODE from "../utils/statusCodes";

const reservationRouter = Router();

reservationRouter.get(
  "/",
  // auth.authenticateToken,
  // auth.authorizeToken([ROLE.Administrator]),
  async (req, res) => {
    //get all reservations
    const reservations = await reservationController.getAllReservations();
    res.status(STATUS_CODE.OK).send(reservations);
  }
);

reservationRouter.get("/:id", async (req, res) => {
  //get reservation by id
  try {
    const reservation = await reservationController.getReservationById(
      toNumber(req.params.id)
    );
    if (reservation === null) {
      res.status(STATUS_CODE.NOT_FOUND).send("Not found");
    } else {
      res.status(STATUS_CODE.OK).send(reservation);
    }
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Server problem");
  }
});

// reservationRouter.put("/", async (req, res) => {
//   // update reservation by id
//   const reservationInput = req.body;
//   try {
//     const affectedreservations = await reservationController.updatereservation(reservationInput);
//     if (affectedreservations == 0) {
//       res.status(STATUS_CODE.NOT_FOUND).send("Not found");
//     } else {
//       res.status(STATUS_CODE.OK).send(affectedreservations);
//     }
//   } catch (err) {}
// });

reservationRouter.delete("/:id", async (req, res) => {
  try {
    const deletedReservations =
      await reservationController.cancelReservationById(
        toNumber(req.params.id)
      );
    if (deletedReservations > 0) {
      res
        .status(STATUS_CODE.OK)
        .send(`deleted reservation with id: ${req.params.id}`);
    } else {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .send(`reservation not found with ID: ${req.params.id}`);
    }
  } catch (err: any) {
    res.status(500).send(err.errors[0].message);
  }
});

reservationRouter.post("/", async (req, res) => {
  // create reservation
  const reservationInput: ReservationDTO = req.body;
  try {
    const createdreservation = await reservationController.createReservation(
      reservationInput
    );
    res.status(STATUS_CODE.CREATED).send(createdreservation);
  } catch (err: any) {
    res.status(STATUS_CODE.CONFLICT).send(err.errors[0].message);
  }
});

export default reservationRouter;
