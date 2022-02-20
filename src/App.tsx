import './App.css'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { createTheme, NextUIProvider } from '@nextui-org/react';

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {}
  }
});

import { Home } from './home';
import { Layout } from './core/layout';

function App() {

  return (
    <NextUIProvider
      theme={darkTheme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App
