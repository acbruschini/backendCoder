// import { Strategy } from "passport-local";
// import { validPasword, genPassword } from "../helpers/passwordUtils";

// export class UserServices {
//   customFields = {
//     usernameField: "userEmail",
//     passwordField: "userPassword",
//     passReqToCallback: true,
//   };

//   async LoginVerifyCallBack(req, userEmail, userPassword, done) {
//     try {
//       const user = await users.findOne({ email: userEmail });
//       if (!user) {
//         return done(null, false);
//       } else if (validPasword(userPassword, user.hash, user.salt)) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     } catch (error) {
//       done(error);
//     }
//   }
// }
