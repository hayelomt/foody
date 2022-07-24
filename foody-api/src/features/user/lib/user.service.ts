import User, { IUser } from '../user';

const UserService = {
  createUser: (data: Partial<IUser>) => {
    return User.create(data);
  },
};

export default UserService;
