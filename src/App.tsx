import { useState } from 'react';
import { WindowProvider } from './context/WindowContext';
import BootScreen from './components/BootScreen/BootScreen';
import Desktop from './components/Desktop/Desktop';
import './App.css';

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <WindowProvider>
      {!booted ? (
        <BootScreen onComplete={() => setBooted(true)} />
      ) : (
        <Desktop />
      )}
    </WindowProvider>
  );
}
