import clsx from 'clsx';
import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

import css from '../styles/ThemeToggler.module.css';

function ThemeToggler() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
      }
      variant="transparent"
      aria-label="Toggle color scheme"
      className={css.icon}
    >
      <IconSun className={clsx(css.icon, css.light)} stroke={2} />
      <IconMoon className={clsx(css.icon, css.dark)} stroke={2} />
    </ActionIcon>
  );
}

export default ThemeToggler;
