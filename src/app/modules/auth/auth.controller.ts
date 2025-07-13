/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { AuthServices } from "./auth.service";
import AppError from "../../error/AppError";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await AuthServices.credentialsLogin(req.body);

    res.cookie("accessToken", loginInfo.accessToken, {
      httpOnly: true,
      secure: false,
    })
    res.cookie("refreshToken", loginInfo.refreshToken, {
      httpOnly: true,
      secure: false,
    })

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Logged In Successfully",
      data: loginInfo,
    });
  }
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      throw new AppError(httpStatus.BAD_REQUEST, "No refresh token from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Logged In Successfully",
      data: tokenInfo,
    });
  }
);


export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken
}