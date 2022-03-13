import { Switch, changeTheme, useTheme } from '@nextui-org/react'
import { BiSun, BiMoon } from "react-icons/bi";

export const ThemeSwitch = () => {
  const { isDark } = useTheme();

  const handleChange = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    window.localStorage.setItem('data-theme', nextTheme); // you can use any storage
    changeTheme(nextTheme);
  }

  return (
    <Switch
      css={ { ml: '1rem' } }
      checked={isDark}
      size="xl"
      color="secondary"
      iconOff={<BiSun />}
      iconOn={<BiMoon />}
      onChange={handleChange}
    />
  );
}