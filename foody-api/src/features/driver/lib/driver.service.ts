import Driver from '../driver';
import DriverDto from './driver.dto';

const DriverService = {
  emailExists: async (email: string) => {
    const driver = await Driver.findOne({ email });

    return driver !== null;
  },

  createDriver: async (data: any) => {
    const driverData = DriverDto.createDriver(data);

    const driver = (await Driver.create(driverData)).toJSON();
    delete driver.password;

    return driver;
  },
};

export default DriverService;
