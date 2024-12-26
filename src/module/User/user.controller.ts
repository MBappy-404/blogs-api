import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

 
 const getAllUser = catchAsync(async (req, res) => {
     const result = await UserService.getAllUsers();
     
     sendResponse(res, {
       success: true,
       message: "Users fetched successfully",
       statusCode: 200,
       data: result, 
     })
 })

 export const UserController = {
     getAllUser
 }