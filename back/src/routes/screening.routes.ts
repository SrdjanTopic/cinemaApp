import { Router } from "express";
import { toNumber } from "lodash";
import * as screeningController from "../controllers/screening.controller";
import auth from "../middleware/auth/authJwt";
import { ScreeningInput } from "../models/Screening";
import { ROLE } from "../models/Role";
import STATUS_CODE from "../utils/statusCodes";

const screeningRouter = Router();

screeningRouter.get(
  "/",
  auth.authenticateToken,
  auth.authorizeToken([ROLE.Administrator]),
  async (req, res) => {
    //get all screenings
    const screenings = await screeningController.getAllScreenings();
    res.status(STATUS_CODE.OK).send(screenings);
  }
);

screeningRouter.get("/:id", async (req, res) => {
  //get screening by id
  try {
    const screening = await screeningController.getScreeningById(
      toNumber(req.params.id)
    );
    if (screening === null) {
      res.status(STATUS_CODE.NOT_FOUND).send("Not found");
    } else {
      res.status(STATUS_CODE.OK).send(screening);
    }
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Server problem");
  }
});

// screeningRouter.put("/", async (req, res) => {
//   // update screening by id
//   const screeningInput = req.body;
//   try {
//     const affectedscreenings = await screeningController.updateScreening(screeningInput);
//     if (affectedscreenings == 0) {
//       res.status(STATUS_CODE.NOT_FOUND).send("Not found");
//     } else {
//       res.status(STATUS_CODE.OK).send(affectedscreenings);
//     }
//   } catch (err) {}
// });

// screeningRouter.delete("/:id", async (req, res) => {
//   try {
//     const deletedscreenings = await screeningController.deleteScreening(
//       toNumber(req.params.id)
//     );
//     if (deletedscreenings > 0) {
//       res
//         .status(STATUS_CODE.OK)
//         .send(`deleted screening with id: ${req.params.id}`);
//     } else {
//       res
//         .status(STATUS_CODE.NOT_FOUND)
//         .send(`screening not found with ID: ${req.params.id}`);
//     }
//   } catch (err: any) {
//     res.status(500).send(err.errors[0].message);
//   }
// });

screeningRouter.post("/", async (req, res) => {
  // create screening
  const screeningInput: ScreeningInput = req.body;
  try {
    const createdscreening = await screeningController.createScreening(
      screeningInput
    );
    res.status(STATUS_CODE.CREATED).send(createdscreening);
  } catch (err: any) {
    res.status(STATUS_CODE.CONFLICT).send(err.errors[0].message);
  }
});

export default screeningRouter;
