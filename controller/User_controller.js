const axios = require("axios");
require("dotenv").config();

const login = (req, res) => {
  return axios
    .post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
      code: req.query.code,
      grant_type: "authorization_code",
      redirect_uri: `http://localhost:5000/auth/callback`,
    })
    .then((accessTokenResponse) => {
      const accessToken = accessTokenResponse.data.access_token;
      console.log(accessToken);
      return axios
        .get(
          `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`
        )
        .then((userDataResponse) => {
          //Destruct the  data from  from auth0
          const { name, nickname, email, picture, sub } = userDataResponse.data;
          console.log("user data--------", userDataResponse.data);
          // res.status(200).json({message: 'mEssages'})
          User.findOne({ auth0_id: sub }, (err, user) => {
            if (err) console.log("Login Error--------------", err);
            //If the user is undefined.
            if (!user) {
              //Create a new user.
              let newUser = new User({
                name: name,
                email: email,
                username: nickname,
                profile_picture: picture,
                auth0_id: sub,
              });
              //Assign the user to the session.
              req.session.user = newUser;
              //Save the session
              req.session.save();
              //Save the newUser instance to mongodb
              newUser.save();
            }
            req.session.user = user;
            req.session.save();
            res.redirect("/");
          });
        })
        .catch((err) =>
          console.log("Auth0 get user info Error------------", err)
        );
    })
    .catch((err) =>
      console.log("Auth0 Axios Post backend Error------------", err)
    );
};

module.exports = {
  login,
};
