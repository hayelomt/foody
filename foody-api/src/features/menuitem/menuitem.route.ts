import { Router } from 'express';
import { imageUpload } from '../../core/middleware/fileupload';
import validate from '../../core/middleware/validate';
import MenuItemVal from './lib/menuitem.val';
import MenuItemController from './menuitem.controller';

const menuItemRouter = Router();

menuItemRouter.post(
  '/',
  imageUpload.single('image'),
  validate(MenuItemVal.createRules),
  MenuItemController.create,
);

export default menuItemRouter;
