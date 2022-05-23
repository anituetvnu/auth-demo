import { compareSync, hash } from 'bcrypt';

import { User } from '../../models';
import { generate } from '../../helpers/jwt';
import { abort } from '../../helpers/error';

export async function signIn({ email, password }) {
  const user = await User.query().findOne({ email });
  if (!user || !compareSync(password, user.password)) {
    return abort(400, 'Email or Password not match');
  }
  const token = await generate({ userId: user.id });

  return token;
}

export async function signUp({ email, password, fullName }) {
  const saltRounds = 10;
  if (await User.query().findOne({ email })) return abort(400, 'Email already exist');
  const hashPassword = await hash(password, saltRounds);
  try {
    await User.query().insert({
      email,
      password: hashPassword,
      full_name: fullName,
    });
  } catch (err) {
    return abort(500, "Can't create user");
  }
  return '';
}
