import { Strategy } from "passport-local";
import { sendEmailRegistration } from "../helpers/sendEmailUtils.js";
import { users } from "../models/schemas/users.js";
import passport from "passport";
import { validPasword, genPassword } from "../helpers/passwordUtils.js";

export default class UsersControllers {
  customFields = {
    usernameField: "userEmail",
    passwordField: "userPassword",
    passReqToCallback: true,
  };

  async LoginVerifyCallBack(req, userEmail, userPassword, done) {
    try {
      const user = await users.findOne({ email: userEmail });
      if (!user) {
        return done(null, false);
      } else if (validPasword(userPassword, user.hash, user.salt)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      done(error);
    }
  }

  async RegisterVerifyCallBack(req, userEmail, userPassword, done) {
    const { userName, userAddress, userAge, userPhone, userPicture } = req.body;
    try {
      const user = await users.findOne({ email: userEmail });
      if (user) {
        return done(null, false);
      } else {
        const newCart = { timestamp: Date.now(), productos: [] };
        const userCartId = (await cartContainer.save(newCart))._id.toString(); /////////
        const { salt, hash } = genPassword(userPassword);
        const newUser = new users({
          timestamp: Date.now(),
          nombre: userName,
          direccion: userAddress,
          edad: userAge,
          telefono: userPhone,
          foto: userPicture,
          carritoId: userCartId,
          email: userEmail,
          salt: salt,
          hash: hash,
        });
        await newUser.save();
        const userWithId = await users.findOne({ email: userEmail });

        // SAVE USER TO USE NEXT
        req.userData = userWithId;

        // SEND CONFIRMATION EMAIL
        sendEmailRegistration(`<h1>Nuevo registro</h1>
            <p>Datos<br>Nombre: ${userName}
            <br>Email: ${userEmail}
            </p>`);

        //RETURN OK
        return done(null, userWithId);
      }
    } catch (error) {
      done(error);
    }
  }

  loginStrategy() {
    return new Strategy(this.customFields, this.LoginVerifyCallBack);
  }

  registerStrategy() {
    return new Strategy(this.customFields, this.RegisterVerifyCallBack);
  }

  async postUser(req, res) {
    res.json({ status: "LoggedIn" }).status(200);
  }
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await users.findById(userId);
    user ? done(null, user) : null;
  } catch (error) {
    done(error);
  }
});
