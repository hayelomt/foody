import UserService from '../../user/lib/user.service';
import AuthDto from './auth.dto';

const AuthService = {
  signUpUser: async (data: any): Promise<boolean> => {
    const userData = AuthDto.signUpDto(data);
    await UserService.createUser(userData);

    return true;
  },
};

export default AuthService;
