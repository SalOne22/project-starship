import { ActionIcon, createTheme, MantineThemeProvider } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import css from './styles/DeleteButton.module.css';

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: css,
    }),
  },
});

export function DeleteButton() {
  return (
    <MantineThemeProvider theme={theme}>
      <ActionIcon
        aria-label="Delete"
        radius="xl"
        size={30}
        variant="transparent"
      >
        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.2} />
      </ActionIcon>
    </MantineThemeProvider>
  );
}

export default DeleteButton;
