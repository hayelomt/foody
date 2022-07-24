import User, { IUser } from '../user';

const UserService = {
  createUser: (data: Partial<IUser>) => {
    return User.create(data);
  },

  emailExists: async (email: string) => {
    const user = await User.findOne({ email });

    return user !== null;
  },
};

export default UserService;
