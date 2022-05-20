const auth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      error: 'You must be logged in',
    });
  }

  return next();
};

export default auth;
