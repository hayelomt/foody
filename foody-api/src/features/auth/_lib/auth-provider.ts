import Findable from '../../../core/contracts/findable';
import ManagerService from '../../manager/_lib/manager.service';
import ManagerTokenService from '../../manager/managertoken/_lib/managertoken.service';
import UserService from '../../user/_lib/user.service';
import UserTokenService from '../../user/usertoken/_lib/usertoken.service';
import Tokenable from '../contracts/tokenable';
import { UserTypes } from './auth-type';

type AuthProviderType = {
  tokenable: Record<UserTypes, Tokenable>;
  authService: Record<UserTypes, Findable>;
};

const AuthProvider: AuthProviderType = {
  tokenable: {
    user: UserTokenService,
    manager: ManagerTokenService,
  },
  authService: {
    user: UserService,
    manager: ManagerService,
  },
};

export default AuthProvider;
