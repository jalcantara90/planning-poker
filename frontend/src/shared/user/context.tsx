import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { createContext, FC, useContext, useEffect, useState } from "react";

import { User } from "./types";

interface IUserContext {
  user: User | null;
  createUser: ({ isSpectator, name }: { isSpectator: boolean, name: string }) => void;
  logout: () => void;
}

const initialContext = {
  user: {
    name: '',
    isSpectator: false,
    id: '',
    me: true,
    selectedCard: undefined
  },
  createUser: (): never => {
    throw new Error();
  },
  logout: (): never => {
    throw new Error();
  }
}

const UserContext = createContext<IUserContext>(initialContext);

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(initialContext.user);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const createUser = ({ isSpectator, name }: { isSpectator: boolean, name: string }) => {
    const me = {
      id: uuid(),
      name,
      me: true,
      isSpectator,
      selectedCard: undefined
    };
    localStorage.setItem('user', JSON.stringify(me));
    setUser(me);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <UserContext.Provider value={{
      user,
      createUser,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
