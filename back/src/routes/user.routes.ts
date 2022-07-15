import { Router } from "express";
import { toNumber } from "lodash";

import * as userController from "../controllers/user.controller";
import { UserInput, UserLoginCredentials } from "../models/User";
import STATUS_CODE from "../utils/statusCodes";

import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "../utils/mailSender";
import { differenceInMilliseconds } from "../utils/timeFunctions";
import { VerificationTokenOutput } from "../models/VerificationToken";
import auth from "../middleware/auth/authJwt";
import { ROLE } from "../models/Role";

const userRouter = Router();

//GET ALL USERS
userRouter.get(
  "/",
  auth.authenticateToken,
  auth.authorizeToken([ROLE.Administrator]),
  async (req, res) => {
    const users = await userController.getAllUsers();
    return res.status(STATUS_CODE.OK).send(users);
  }
);

userRouter.get(
  "/customers",
  auth.authenticateToken,
  auth.authorizeToken([ROLE.Administrator]),
  async (req, res) => {
    const users = await userController.getAllUsers();
    return res.status(STATUS_CODE.OK).send(users);
  }
);

//GET USER BY ID
userRouter.get(
  "/:id",
  auth.authenticateToken,
  auth.authorizeToken([ROLE.Administrator]),
  async (req, res) => {
    try {
      const user = await userController.getUserById(toNumber(req.params.id));
      if (user === null) {
        res.status(STATUS_CODE.NOT_FOUND).send("Not found");
      } else {
        res.status(STATUS_CODE.OK).send(user);
      }
    } catch (err) {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Server problem");
    }
  }
);
//GET USER BY EMAIL
userRouter.get(
  "/user/:username",
  auth.authenticateToken,
  auth.authorizeToken([ROLE.Administrator]),
  async (req, res) => {
    try {
      const user = await userController.getUserByEmail(req.params.username);
      if (user === null) {
        res.status(STATUS_CODE.NOT_FOUND).send("Not found");
      } else {
        res.status(STATUS_CODE.OK).send(user);
      }
    } catch (err) {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Server problem");
    }
  }
);

//UPDATE USER
userRouter.put(
  "/:id",
  auth.authenticateToken,
  auth.authorizeToken([ROLE.Customer, ROLE.Administrator]),
  async (req, res) => {
    const userId = toNumber(req.params.id);
    const userInput = req.body;
    try {
      const affectedUsers = await userController.updateUser(userId, userInput);
      if (affectedUsers == 0) {
        res.status(STATUS_CODE.NOT_FOUND).send("User for the ID not found!");
      } else {
        res.status(STATUS_CODE.OK).send("User successfully updated");
      }
    } catch (err) {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("server error");
    }
  }
);

//DELETE BY USERNAME
userRouter.delete("/:username", async (req, res) => {
  try {
    const deleted = await userController.deleteUserByUsername(
      req.params.username
    );
    res
      .status(STATUS_CODE.OK)
      .send(`deleted genre with name: ${req.params.username}`);
  } catch (err: any) {
    res.status(STATUS_CODE.NOT_FOUND).send(err.errors[0].message);
  }
});

//CREATE USER
userRouter.post("/signup", async (req, res) => {
  let userInput: UserInput = req.body;
  userInput.RoleId = 2;
  let token = { UserId: undefined, uuid: uuidv4() };
  userInput.VerificationToken = token;
  try {
    const createdUser = await userController.createUser(userInput);
    sendVerificationEmail(createdUser.email, token.uuid);
    res.status(STATUS_CODE.CREATED).send(createdUser);
  } catch (err: any) {
    switch (err.errors[0].message) {
      case "username must be unique":
        res
          .status(STATUS_CODE.CONFLICT)
          .send("There is already a user with this username!");
        break;
      case "email must be unique":
        res
          .status(STATUS_CODE.CONFLICT)
          .send("There is already a user with this email!");
        break;
      default:
        res.status(STATUS_CODE.CONFLICT).send(err.errors[0].message);
    }
  }
});

//VERIFY USER
userRouter.get(`/verify/:token`, async (req, res) => {
  const verificationToken = req.params.token;
  try {
    const token: VerificationTokenOutput | null =
      await userController.verifyUser(verificationToken);
    if (token === null) {
      res
        .status(STATUS_CODE.NOT_FOUND)
        .send(
          "Token is invalid. You are provided with a wrong token. Try registering again or check your email for the right token."
        ); //invalid token
    } else {
      if (differenceInMilliseconds(new Date(), token.updatedAt) > 300000) {
        res
          .status(STATUS_CODE.CONFLICT)
          .send("Token expired. Please register again!"); //Token expired. You must register again!
      } else {
        res.status(STATUS_CODE.OK).send(token.uuid);
      }
    }
  } catch (err: any) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(err);
  }
});

//LOGIN USER
userRouter.post("/login", async (req, res) => {
  let loginCredentials: UserLoginCredentials = req.body;
  try {
    const loggedInUserOrMessage = await userController.loginUser(
      loginCredentials
    );
    switch (loggedInUserOrMessage) {
      case "There is no user with this username or email!": {
        res.status(STATUS_CODE.NOT_FOUND).send(loggedInUserOrMessage);
        break;
      }
      case "Incorrect password!": {
        res.status(STATUS_CODE.CONFLICT).send(loggedInUserOrMessage);
        break;
      }
      case "User not verified! Check you email for the verification link!": {
        res.status(STATUS_CODE.CONFLICT).send(loggedInUserOrMessage);
        break;
      }
      default: {
        const token = auth.generateAccessToken(
          loggedInUserOrMessage.username,
          loggedInUserOrMessage.email,
          loggedInUserOrMessage.Role.role
        );
        res
          .status(STATUS_CODE.OK)
          .json({ token: token, user: loggedInUserOrMessage });
        break;
      }
    }
  } catch (err: any) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(err);
  }
});

export default userRouter;
