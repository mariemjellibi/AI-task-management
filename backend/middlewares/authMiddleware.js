import jwt from 'jsonwebtoken'
import User from "../models/User.js";
// const protectRoute = async (req, res, next) => {
//     try {
//       let token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
//       console.log("JWT Secret in server:", process.env.JWT_SECRET);

//       console.log("Received Token:", token); // Log the token
  
//       if (!token) {
//         return res.status(401).json({ message: "Not authorized, no token provided" });
//       }
//   const secret = process.env.JWT_SECRET;
//       const decodedToken = jwt.verify(token, secret);
//       console.log("Decoded Token:", decodedToken); // Log decoded token
//   console.log(decodedToken.id);
//       const user = await User.findById(decodedToken.id).select("isAdmin email");
//       if (!user) {
//         return res.status(401).json({ message: "User not found" });
//       }
  
//       req.user = {
//         email: user.email,
//         isAdmin: user.isAdmin,
//         userId: decodedToken.id,
//       };
//   console.log("User in protectRoute:", req.user);
//       next();
//     } catch (error) {
//       console.error("Error in protectRoute:", error.message); // Log error message
//       return res.status(401).json({ message: "Not authorized. Try login again." });
//     }
//   };
// Protect route (Authentication)
const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token || (req.headers.authorization?.split(" ")[1]);

    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id).select("isAdmin email");
console.log("User in protectRoute:", user);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = { email: user.email, isAdmin: user.isAdmin, userId: decodedToken.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized. Try login again." });
  }
};

// Admin check (Authorization)
const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // Proceed to task creation
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};
export { protectRoute, isAdminRoute };