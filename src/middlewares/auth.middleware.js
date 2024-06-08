import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
  
    if (!token) {
      throw new ApiError(400, "Unauthorized request");
    }
  
    const decodedToken = jwt.verify(token, process.env.ACESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id).select("-passowrd -refreshToken")
  
    if(!user){
      throw new ApiError(401, "Invalid Access Token")
    }
  
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access Token")
  }

});
