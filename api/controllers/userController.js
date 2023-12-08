// import User from "../models/user.model.js";
// import { errorHandler } from "../utils/error.js";
// import bcryptjs from "bcryptjs";

// export const getUserListing = async (req, res, next) => {
//   if (req.user.id === req.params.id) {
//     try {
//       const listings = await Listing.find({ userRef: req.params.id });
//       res.status(200).json(listings);
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     next(errorHandler(401, "You can only view your own Listing"));
//   }
// };

// export const getUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return next((404, "user not found!"));
//     const { password: pass, ...rest } = user._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };
