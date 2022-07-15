import { UserInput, UserLoginCredentials, UserOutput } from "../models/User";
import { VerificationTokenOutput } from "../models/VerificationToken";
import * as userRepository from "../repositories/user.repository";
import { differenceInMilliseconds } from "../utils/timeFunctions";
import bcrypt from "bcrypt";

export const getAllUsers = async (): Promise<UserOutput[]> => {
  return await userRepository.getAllUsers();
};

export const getUserById = async (
  userId: number
): Promise<UserOutput | null> => {
  return await userRepository.getUserById(userId);
};

export const getUserByEmail = async (
  email: string
): Promise<UserOutput | null> => {
  return await userRepository.getUserByEmail(email);
};

export const createUser = async (userInput: UserInput): Promise<UserOutput> => {
  return await userRepository.createUser(userInput);
};

export const updateUser = async (
  userId: number,
  userInput: UserInput
): Promise<any> => {
  return await userRepository.updateUser(userId, userInput);
};

export const deleteUserByUsername = async (
  usernmae: string
): Promise<Boolean> => {
  return await userRepository.deleteUserByUsername(usernmae);
};

export const verifyUser = async (
  verificationToken: string
): Promise<VerificationTokenOutput | null> => {
  const token = await userRepository.verifyUser(verificationToken);
  if (
    token !== null &&
    differenceInMilliseconds(new Date(), token.updatedAt) < 300000
  ) {
    await userRepository.updateUser(token.UserId, { isVerified: true });
  }
  if (
    token !== null &&
    differenceInMilliseconds(new Date(), token.updatedAt) > 300000
  ) {
    userRepository.deleteUserById(token.UserId);
  }
  return token;
};

export const loginUser = async (
  loginCredentials: UserLoginCredentials
): Promise<UserOutput | string> => {
  const user: UserOutput | null = await userRepository.loginUser(
    loginCredentials.usernameOrEmail
  );
  if (user === null) return "There is no user with this username or email!";
  if (!bcrypt.compareSync(loginCredentials.password, user.password))
    return "Incorrect password!";
  if (!user.isVerified)
    return "User not verified! Check you email for the verification link!";
  else return user;
};
