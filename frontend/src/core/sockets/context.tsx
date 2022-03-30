import { createContext, FC, useContext, useEffect } from 'react';

const SocketContext = createContext({});

export const SocketProvider: FC = ({ children }) => {
  
  useEffect(() => {

  }, []);


  return (
    <SocketContext.Provider value={{  }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocketContext = () => useContext(SocketContext);
