import { useContext, useState } from 'react';
import { OrderContext } from '../../../core/state/OrderContext';

const useFoodDetailHook = () => {
  const [currentItems, setCurrentItems] = useState(0);
  const { getOrderCount } = useContext(OrderContext);

  const addItem = () => {
    setCurrentItems((prevCount) => prevCount + 1);
  };

  const removeItem = () => {
    setCurrentItems((prevCount) => prevCount - 1);
  };

  return { currentItems, addItem, removeItem, getOrderCount };
};

export default useFoodDetailHook;
