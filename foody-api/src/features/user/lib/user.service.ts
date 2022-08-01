import Authenticable from '../../auth/contracts/authenticable';
import User, { IUser } from '../user';

const UserService: Authenticable & Record<string, any> = {
  findByEmail: async (email: string) => {
    return User.findOne({ email });
  },

  createUser: (data: Partial<IUser>) => {
    return User.create(data);
  },

  emailExists: async (email: string) => {
    const user = await User.findOne({ email });

    return user !== null;
  },
};

export default UserService;
