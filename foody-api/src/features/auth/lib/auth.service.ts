import HttpError from '../../../core/error';
import UserService from '../../user/lib/user.service';
import User, { IUser } from '../../user/user';
import AuthDto from './auth.dto';

const AuthService = {
  signUpUser: async (data: any): Promise<boolean> => {
    const userData = AuthDto.signUpDto(data);
    await UserService.createUser(userData);

    return true;
  },

  login: async (data: any): Promise<IUser> => {
    const { email, password } = AuthDto.loginDto(data);

    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(400, 'Authorization error', {
        email: 'Invalid Credential',
      });
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      throw new HttpError(400, 'Authorization error', {
        email: 'Invalid Credential',
      });
    }

    return user;
  },
};

export default AuthService;
