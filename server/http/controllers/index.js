import { handleError } from '../../helpers/error';
import authController from './auth';

const controllers = {
  authController,
};

Object.keys(controllers).forEach((key) => {
  Object.keys(controllers[key]).forEach((keyFunction) => {
    controllers[key][keyFunction] = handleError(controllers[key][keyFunction]);
  });
});

// eslint-disable-next-line import/prefer-default-export
export { authController };
