exports.jwtToken = (token, res) => {
  return res.cookie("access_token", token, {
    maxAge: Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV == "production" ? "None" : "",
    secure: process.env.NODE_ENV == "production" ? true : false,
    path: "/",
  });
};
