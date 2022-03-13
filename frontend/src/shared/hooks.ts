import { useState } from 'react';

type UseToggle = [
  boolean,
  () => void,
  (value: boolean) => void
];

export function useToggle(v: boolean): UseToggle {
  const [value, setValue] = useState<boolean>(v);

  const toggle = () => setValue(v => !v);

  return [
    value,
    toggle,
    setValue
  ];
}