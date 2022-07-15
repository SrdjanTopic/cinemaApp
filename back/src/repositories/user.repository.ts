import {
  Movie,
  Reservation,
  Role,
  Screening,
  Seat,
  User,
  VerificationToken,
} from "../models";
import { UserInput, UserOutput } from "../models/User";
import { VerificationTokenOutput } from "../models/VerificationToken";
import { Op } from "sequelize";

export const getAllUsers = async (): Promise<UserOutput[]> => {
  return User.findAll({ include: [VerificationToken, Role] });
};
export const getUserById = async (
  userId: number
): Promise<UserOutput | null> => {
  return User.findByPk(userId, { include: [VerificationToken, Role] });
};

export const createUser = async (userInput: UserInput): Promise<UserOutput> => {
  return User.create(userInput, { include: [VerificationToken, Role] });
};

export const updateUser = async (
  userId: number,
  userInput: Partial<UserInput>
): Promise<any> => {
  const user = User.findByPk(userId);
  if (!user) {
    throw new Error("Not found");
  }

  return User.update(userInput, { where: { id: userId } });
};

export const deleteUserByUsername = async (
  username: string
): Promise<Boolean> => {
  return !!User.destroy({
    where: { username: username },
  });
};

export const deleteUserById = async (userId: number): Promise<Boolean> => {
  return !!User.destroy({
    where: { id: userId },
  });
};

export const verifyUser = async (
  verificationToken: string
): Promise<VerificationTokenOutput | null> => {
  return VerificationToken.findOne({
    where: { uuid: verificationToken },
  });
};

export const loginUser = async (
  usernameOrEmail: string
): Promise<UserOutput | null> => {
  return User.findOne({
    where: {
      [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
    include: [Role],
  });
};

export const getUserByEmail = async (
  email: string
): Promise<UserOutput | null> => {
  return User.findOne({
    where: { email: email },
    include: [
      Role,
      {
        model: Reservation,
        include: [
          { model: Screening, include: [{ model: Movie }] },
          { model: Seat },
        ],
      },
    ],
  });
};
