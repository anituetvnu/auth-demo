import joi from 'joi';

import { signUp as _signUp } from '../../services/auth';
import { abort } from '../../../helpers/error';

const validate = async (params) => {
  const schema = joi.object({
    email: joi.string().email().max(127).required(),
    password: joi.string().min(6).max(127).required(),
    confirmPassword: joi.ref('password'),
    fullName: joi.string().max(127).required(),
  });
  try {
    return await schema.validate(params);
  } catch (err) {
    return abort(400, 'Params error');
  }
};

const signUp = async (req, res) => {
  const {
    email, password, confirmPassword, fullName,
  } = req.body;
  await validate({
    email, password, confirmPassword, fullName,
  });
  await _signUp({ email, password, fullName });
  res.status(201).send();
};

export default signUp;
