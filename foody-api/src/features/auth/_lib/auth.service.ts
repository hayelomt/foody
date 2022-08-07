import HttpError from '../../../core/error';
import ManagerService from '../../manager/_lib/manager.service';
import UserService from '../../user/_lib/user.service';
import Authenticable, { IAuthUser } from '../contracts/authenticable';
import AuthDto from './auth.dto';

const AuthService = {
  signUpUser: async (data: any): Promise<boolean> => {
    const userData = AuthDto.signUpUserDto(data);
    await UserService.createUser(userData);

    return true;
  },

  signUpManager: async (data: any) => {
    const managerData = AuthDto.signUpManagerDto(data);
    await ManagerService.createManager(managerData);

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
