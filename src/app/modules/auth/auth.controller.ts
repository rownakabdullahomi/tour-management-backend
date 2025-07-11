/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { AuthServices } from "./auth.service";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const user = await UserServices.createUser(req.body);

    // res.status(httpStatus.CREATED).json({
    //   success: true,
    //   message: `User created successfully..`,
    //   user,
    // });

    const loginInfo = await AuthServices.credentialsLogin(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Logged In Successfully",
      data: loginInfo,
    });
  }
);


export const AuthControllers = {
    credentialsLogin
}