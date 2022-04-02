import { FC } from 'react';
import { BiCog } from 'react-icons/bi';
import { Avatar, Button, Text } from '@nextui-org/react';
import { MdLogin } from 'react-icons/md';

import { UserAvatar } from './user-avatar';
import { ThemeSwitch } from './theme-switch';
import { Header, HeaderSection } from './header';
import { useUserContext } from '../../shared/user/context';

export const Layout: FC = ({ children }) => {
  const { user, logout } = useUserContext();
  
  return (
    <>
      <Header>
        <HeaderSection>
          <Text color="primary" size={24}>
            SPrint 1
          </Text>
          <Button 
            css={ { ml: '1rem' } } 
            auto 
            light
            size="lg" 
            icon={<BiCog style={{ width: '1.5rem', height: '1.5rem' }} fill="currentColor" size="1rem"/>} />
        </HeaderSection>
        
        <UserAvatar>
          {
            !!user?.name && (
              <>
                <Avatar text={user.name.slice(0, 1).toLocaleUpperCase()} size="md" css={ { mr: '1rem' } }/>
                <Text css={ { ml: '1rem' } }>
                  { user.name }
                </Text>
                <Button
                  onClick={logout}
                  size="sm"
                  css={{ fs: '1.5rem' }}
                  light
                  icon={<MdLogin />}
                />
              </>
            )
          }
          <ThemeSwitch />
        </UserAvatar>
      </Header>
      {children}
    </>
  );
}