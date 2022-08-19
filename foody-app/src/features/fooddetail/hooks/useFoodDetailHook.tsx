import { useContext, useState } from 'react';
import { OrderContext } from '../../../core/state/OrderContext';
import { MenuItem } from '../../restaurant/restaurant';

const useFoodDetailHook = (menuItem: MenuItem) => {
  const [showMsg, setShowMsg] = useState(false);
  const [currentItems, setCurrentItems] = useState(0);
  const { getOrderCount, addOrder, state } = useContext(OrderContext);

  const addItem = () => {
    setCurrentItems((prevCount) => prevCount + 1);
  };

  const removeItem = () => {
    setCurrentItems((prevCount) => prevCount - 1);
  };

  const placeOrder = () => {
    addOrder(state, menuItem, currentItems);
    setCurrentItems(0);
    setShowMsg(true);
  };

  const hideSnackbar = () => setShowMsg(false);

  return {
    currentItems,
    addItem,
    removeItem,
    getOrderCount,
    showMsg,
    placeOrder,
    hideSnackbar,
  };
};

export default useFoodDetailHook;
