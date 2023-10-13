import { ActionIcon, createTheme, MantineThemeProvider } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';

import css from './styles/EditButton.module.css';

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: css,
    }),
  },
});

export function EditButton() {
  return (
    <MantineThemeProvider theme={theme}>
      <ActionIcon aria-label="Edit" radius="xl" size={30} variant="transparent">
        <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.2} />
      </ActionIcon>
    </MantineThemeProvider>
  );
}

export default EditButton;
