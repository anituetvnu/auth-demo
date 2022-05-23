import joi from 'joi';

import { signIn as _signIn } from '../../services/auth';
import { abort } from '../../../helpers/error';

const validate = async (params) => {
  const schema = joi.object({
    email: joi.string().max(127).email().required(),
    password: joi.string().min(6).required(),
  });
  try {
    return await schema.validate(params);
  } catch (err) {
    return abort(400, 'Params error!');
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  await validate({ email, password });
  const token = await _signIn({ email, password });
  res.status(200).send(token);
};

export default signIn;
