import { UserInput, UserLoginCredentials, UserOutput } from "../models/User";
import { VerificationTokenOutput } from "../models/VerificationToken";
import * as userService from "../services/user.service";

export const getAllUsers = async (): Promise<UserOutput[]> => {
  return await userService.getAllUsers();
};

export const getUserById = async (
  userId: number
): Promise<UserOutput | null> => {
  return await userService.getUserById(userId);
};

export const getUserByEmail = async (
  email: string
): Promise<UserOutput | null> => {
  return await userService.getUserByEmail(email);
};

export const createUser = async (userInput: UserInput): Promise<UserOutput> => {
  return await userService.createUser(userInput);
};

export const updateUser = async (userId: number, userInput: UserInput) => {
  return await userService.updateUser(userId, userInput);
};

export const deleteUserByUsername = async (
  username: string
): Promise<Boolean> => {
  return await userService.deleteUserByUsername(username);
};

export const verifyUser = async (
  verificationToken: string
): Promise<VerificationTokenOutput | null> => {
  return await userService.verifyUser(verificationToken);
};

export const loginUser = async (
  loginCredentials: UserLoginCredentials
): Promise<any> => {
  return await userService.loginUser(loginCredentials);
};
