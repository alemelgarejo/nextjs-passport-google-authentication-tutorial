import { Profile, Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { PrismaClient } from "@prisma/client";
import gapi from 'gapi'

const prisma = new PrismaClient();

// logic to save your user or check if user exists in your record to proceed.

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/api/oauth2/redirect/google", // callback url on our app to verify authentication.
    },
    async (_accessToken, _refreshToken, profile, cb: any) => {
      const prof = profile._json;
      try {
        const checkUser = await prisma.users.findUnique({
          where: {
            email: String(prof.email),
          },
        });
        if (!checkUser) {
          console.log("No existe");
          const user = await prisma.users.create({
            data: {
              name: String(prof.name),
              given_name: String(prof.given_name),
              family_name: String(prof.family_name),
              picture: String(prof.picture),
              google_id: String(profile.id),
              email: String(prof.email),
              email_verified: prof.email_verified,
              locale: String(prof.locale),
              accessToken: _accessToken,
            },
          });
          console.log(user);
          console.log("Creado");
        } else {
          console.log("Existe");
          const user = await prisma.users.update({
            where: {
              email: String(prof.email),
            },
            data: {
              accessToken: _accessToken,
            },
          });
          console.log(user);
          console.log("Actualizado");

          const cal = await fetch('https://www.googleapis.com/calendar/v3/calendars/melgarejoale1@gmail.com/events', {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
            },
          })
          console.log(cal);
          
        }

        return cb(null, profile);
      } catch (e: any) {
        throw new Error(e);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.deserializeUser(function (
  user: any,
  cb: (arg0: null, arg1: any) => any
) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

export default passport;
