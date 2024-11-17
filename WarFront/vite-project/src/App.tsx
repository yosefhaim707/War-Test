import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import MyRoutes from './routes/MyRoutes';
import Register from './components/Register';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Register />
      <MyRoutes />
    </>
  );
}

export default App;
