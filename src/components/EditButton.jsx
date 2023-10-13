import { ActionIcon, createTheme, MantineThemeProvider } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import PropTypes from 'prop-types';

import css from './styles/EditButton.module.css';

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: css,
    }),
  },
});

export function EditButton({ handleEdit }) {
  return (
    <MantineThemeProvider theme={theme}>
      <ActionIcon
        component="button"
        aria-label="Edit"
        radius="xl"
        size={30}
        variant="transparent"
        onClick={handleEdit}
      >
        <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.2} />
      </ActionIcon>
    </MantineThemeProvider>
  );
}

EditButton.propTypes = {
  handleEdit: PropTypes.func,
};

export default EditButton;
