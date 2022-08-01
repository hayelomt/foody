import MenuItem from '../menuitem';
import MenuItemDto from './menuitem.dto';

const MenuItemService = {
  create: (data: any) => {
    const filtered = MenuItemDto.createMenuItem(data);

    return MenuItem.create(filtered);
  },
};

export default MenuItemService;
