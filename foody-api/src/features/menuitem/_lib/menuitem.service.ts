import appConstants from '../../../core/utils/appconstants';
import MenuItem from '../menuitem';
import MenuItemDto from './menuitem.dto';

const MenuItemService = {
  create: (data: any) => {
    const filtered = MenuItemDto.createMenuItem(data);

    return MenuItem.create(filtered);
  },

  findAll: () => {
    return MenuItem.find({ available: true })
      .populate(appConstants.models.restaurant)
      .limit(10);
  },
};

export default MenuItemService;
