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
import { Game } from './game';
import { Layout } from './core/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './shared/user/context';
import { SocketProvider } from './core/sockets/context';

const queryClient = new QueryClient();

function App() {

  return (
    <NextUIProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <SocketProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/:gameId" element={<Game />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </SocketProvider>
        </UserProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export default App
