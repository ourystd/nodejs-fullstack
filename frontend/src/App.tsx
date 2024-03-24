import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function Counter() {
  const [count, setCount] = useState(0);

  function incrementX() {
    setCount(count + 1);
    setCount(count + 1);
  }

  function incrementY() {
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  }

  return (
    <div>
      <div>{incrementX()!}</div>
      <div>{incrementY()!}</div>
    </div>
  );
}

function Home() {
  return (
    <div className="bg-slate-200 h-screen w-svw">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
