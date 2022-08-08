import User, { IUser } from '../user';

const UserService = {
  findOne: async (id: string) => {
    return await User.findById(id).select('-password');
  },

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
