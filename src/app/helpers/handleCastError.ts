/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose"
import { TGenericErrorResponse } from "../interfaces/error.types"

export const handleCastError = (error: mongoose.Error.CastError): TGenericErrorResponse =>{
  return {
    statusCode: 400,
    message: "Please provide a valid ID."
  }
}