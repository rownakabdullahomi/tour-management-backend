import AppError from "../../error/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";

/// Create a new user
const createUser = async (payload: Partial<IUser>) => {
  const { email, ...rest } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist..");
  }

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

/// Get all users
const getAllUsers = async () => {
  const users = await User.find({});

  const totalUsers = await User.countDocuments(); //. for meta

  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
};
