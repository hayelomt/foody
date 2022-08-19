import { createContext, ReactNode, useReducer } from 'react';
import { MenuItem } from '../../features/restaurant/restaurant';
import { logIt } from '../utils/logger';

export type OrderItem = {
  menuItem: MenuItem;
  amount: number;
};

type OrderState = {
  orderItems: Record<string, OrderItem>;
  submitting: boolean;
};

type ReducerAction =
  | {
      type: 'add_menu_item';
      payload: { menuItem: MenuItem; amount: number };
    }
  | { type: 'remove_menu_item'; payload: { id: string } }
  | { type: 'change_amount'; payload: { id: string; amount: number } };

const orderReducer = (state: OrderState, action: ReducerAction): OrderState => {
  const { orderItems } = state;
  switch (action.type) {
    case 'add_menu_item':
      return {
        ...state,
        orderItems: {
          ...orderItems,
          [action.payload.menuItem._id]: {
            menuItem: action.payload.menuItem,
            amount: action.payload.amount,
          },
        },
      };
    case 'change_amount':
      const amount = Math.max(
        0,
        action.payload.amount + state.orderItems[action.payload.id].amount
      );
      return {
        ...state,
        orderItems: {
          ...orderItems,
          [action.payload.id]: {
            ...orderItems[action.payload.id],
            amount,
          },
        },
      };
    case 'remove_menu_item':
      const curItems = { ...orderItems };
      delete curItems[action.payload.id];

      return {
        ...state,
        orderItems: curItems,
      };
    default:
      return state;
  }
};

const initOrderState: OrderState = {
  orderItems: {},
  submitting: false,
};

type OrderContextType = {
  state: OrderState;

  addOrder: (state: OrderState, item: MenuItem, addOrder: number) => void;
  decrementOrder: (item: MenuItem, addOrder: number) => void;
  removeOrder: (item: MenuItem) => void;
  getOrderCount: () => number;
  getOrderTotal: () => number;
  placeOrder: (state: OrderState) => Promise<boolean>;
};

export const OrderContext = createContext<OrderContextType>({
  state: {
    orderItems: {},
    submitting: false,
  },
  addOrder: (_state, _item, _) => {},
  decrementOrder: (_item, _) => {},
  removeOrder: (_) => {},
  getOrderCount: () => 0,
  getOrderTotal: () => 0,
  placeOrder: async (_) => false,
});

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, initOrderState);

  const addOrder = (state: OrderState, menuItem: MenuItem, amount: number) => {
    // console.log('add', state.orderItems[menuItem._id]);
    if (state.orderItems[menuItem._id] === undefined) {
      dispatch({ type: 'add_menu_item', payload: { menuItem, amount } });
      return;
    }

    dispatch({ type: 'change_amount', payload: { id: menuItem._id, amount } });
  };

  const decrementOrder = (menuItem: MenuItem, amount: number) => {
    dispatch({
      type: 'change_amount',
      payload: { id: menuItem._id, amount: -1 * amount },
    });
  };

  const removeOrder = (menuItem: MenuItem) => {
    dispatch({ type: 'remove_menu_item', payload: { id: menuItem._id } });
  };

  const getOrderCount = () => Object.values(state.orderItems).length;

  const getOrderTotal = () => {
    let total = 0;
    Object.values(state.orderItems).forEach((item) => {
      total += item.menuItem.price * item.amount;
    });

    return total;
  };

  const placeOrder = async (state: OrderState) => {
    logIt('Orders', state);

    return false;
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        addOrder,
        decrementOrder,
        removeOrder,
        getOrderCount,
        getOrderTotal,
        placeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
