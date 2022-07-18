import { useDeviceContext } from 'twrnc';
import AppRoutes from './src/app/routes';
import tw from './src/core/lib/tailwind';

export default function App() {
  useDeviceContext(tw, { withDeviceColorScheme: false });

  return <AppRoutes />;
}
