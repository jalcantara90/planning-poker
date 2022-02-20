import { FC } from 'react';
import { Avatar, Button, Text } from '@nextui-org/react';

import { Header, HeaderSection } from './header';
import { UserAvatar } from './user-avatar';
import { ThemeSwitch } from './theme-switch';
import { BiCog } from 'react-icons/bi';

export const Layout: FC = ({ children }) => {
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
          <Avatar text="JA" size="md" css={ { mr: '1rem' } }/>
          <Text css={ { ml: '1rem' } }>
            Jonathan
          </Text>
          <ThemeSwitch />
        </UserAvatar>
      </Header>
      {children}
    </>
  );
}