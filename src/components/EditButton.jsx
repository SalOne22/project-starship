import {
  ActionIcon,
  createTheme,
  MantineThemeProvider,
  Tooltip,
} from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import css from './styles/EditButton.module.css';

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: css,
    }),
  },
});

export function EditButton({ handleEdit }) {
  const { t } = useTranslation();

  return (
    <MantineThemeProvider theme={theme}>
      <Tooltip
        arrowPosition="side"
        arrowOffset={30}
        arrowSize={5}
        label={t('common.edit')}
        color="grey"
        withArrow
        position="top-center"
      >
        <ActionIcon
          component="button"
          aria-label={t('common.edit')}
          radius="xl"
          size={30}
          variant="transparent"
          onClick={handleEdit}
        >
          <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.2} />
        </ActionIcon>
      </Tooltip>
    </MantineThemeProvider>
  );
}

EditButton.propTypes = {
  handleEdit: PropTypes.func,
};

export default EditButton;
