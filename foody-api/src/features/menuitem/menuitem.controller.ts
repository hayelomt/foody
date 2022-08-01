import catchAsync from '../../core/utils/catchasync';
import MenuItemService from './lib/menuitem.service';

const MenuItemController = {
  create: catchAsync(async (req, res) => {
    const result = await MenuItemService.create({ ...req.body, ...req.file });

    res.status(201).json(result);
  }),
};

export default MenuItemController;
