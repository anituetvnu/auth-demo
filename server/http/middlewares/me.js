import { User } from '../../models';
import { parse } from '../../helpers/jwt';

async function getUser(token) {
  const payload = await parse(token);
  if (payload === false) return false;
  const user = await User.query().findOne({ id: payload.userId });
  if (!user) return false;
  return user;
}

const getToken = (req) => {
  const authorization = req.headers.authorization || '';
  if (authorization === '') return false;
  if (!authorization.startsWith('Bearer ')) return false;
  const token = authorization.slice(7, authorization.length);
  return token;
};

async function me(req, res, next) {
  const token = getToken(req);
  const user = await getUser(token);
  req.user = user;
  next();
}

export default me;
