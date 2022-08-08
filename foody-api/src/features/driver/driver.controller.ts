import catchasync from '../../core/utils/catchasync';
import DriverService from './_lib/driver.service';

const DriverController = {
  create: catchasync(async (req, res) => {
    const result = await DriverService.createDriver(req.body);

    res.status(201).json(result);
  }),
};

export default DriverController;
