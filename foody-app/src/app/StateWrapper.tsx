import { OrderProvider } from '../core/state/OrderContext';
import AppRoutes from './AppRoutes';

const StateWrapper = () => {
  return (
    <OrderProvider>
      <AppRoutes />
    </OrderProvider>
  );
};

export default StateWrapper;
