import { useDeviceContext } from 'twrnc';
import StateWrapper from './src/app/StateWrapper';
import tw from './src/core/lib/tailwind';

export default function App() {
  useDeviceContext(tw, { withDeviceColorScheme: false });

  return <StateWrapper />;
}
