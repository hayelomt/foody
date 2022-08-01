import HttpError from '../../../core/error';
import UserService from '../../user/lib/user.service';
import Authenticable, { IAuthUser } from '../contracts/authenticable';
import AuthDto from './auth.dto';

const AuthService = {
  signUpUser: async (data: any): Promise<boolean> => {
    const userData = AuthDto.signUpDto(data);
    await UserService.createUser(userData);

    return true;
  },

  login: async (
    authenticable: Authenticable,
    data: any,
  ): Promise<IAuthUser> => {
    const { email, password } = AuthDto.loginDto(data);

    const authUser = await authenticable.findByEmail(email);
    if (!authUser) {
      throw new HttpError(400, 'Authorization error', {
        email: 'Invalid Credential',
      });
    }

    const valid = await authUser.comparePassword(password);
    if (!valid) {
      throw new HttpError(400, 'Authorization error', {
        email: 'Invalid Credential',
      });
    }

    return authUser;
  },
};

export default AuthService;
