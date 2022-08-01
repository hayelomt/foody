import Authenticable from '../../auth/contracts/authenticable';
import { SignUpManagerDto } from '../../auth/lib/auth.dto';
import Manager from '../manager';

const ManagerService = {
  findByEmail: async (email: string) => {
    return Manager.findOne({ email });
  },

  createManager: (data: SignUpManagerDto) => {
    return Manager.create(data);
  },

  emailExists: async (email: string) => {
    const manager = await Manager.findOne({ email });

    return manager !== null;
  },
};

export default ManagerService;
