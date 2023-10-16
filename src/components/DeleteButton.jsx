import {
  ActionIcon,
  createTheme,
  MantineThemeProvider,
  Tooltip,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import PropTypes from 'prop-types';

import css from './styles/DeleteButton.module.css';

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: css,
    }),
  },
});

export function DeleteButton({ handleDelete }) {
  return (
    <MantineThemeProvider theme={theme}>
      <Tooltip
        arrowPosition="side"
        arrowOffset={30}
        arrowSize={5}
        label="Delete"
        color="grey"
        withArrow
        position="top-center"
      >
        <ActionIcon
          aria-label="Delete"
          radius="xl"
          size={30}
          variant="transparent"
          onClick={handleDelete}
        >
          <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.2} />
        </ActionIcon>
      </Tooltip>
    </MantineThemeProvider>
  );
}
DeleteButton.propTypes = {
  handleDelete: PropTypes.func,
};

export default DeleteButton;
