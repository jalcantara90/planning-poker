import { v4 as uuid } from 'uuid';
import { createContext, FC, useContext, useEffect, useState } from "react";
import { User } from "./types";

interface IUserContext {
  user: User;
  createUser: ({ isSpectator, name }: { isSpectator: boolean, name: string }) => void;
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
  }
}

const UserContext = createContext<IUserContext>(initialContext);

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>(initialContext.user);

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

  return (
    <UserContext.Provider value={{
      user,
      createUser
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
