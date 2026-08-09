import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }
  
  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass', // Instantly pass through all non-mocked requests
    quiet: true, // Silence internal MSW startup logs and warnings
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});