import PropTypes from 'prop-types';

import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

import css from '../styles/CloseButton.module.css';

function CloseButton({ onClose }) {
  return (
    <ActionIcon
      aria-label="Close modal"
      size={24}
      variant="transparent"
      className={css.closeBtn}
      onClick={onClose}
    >
      <IconX style={{ width: '100%', height: '100%' }} stroke={2} />
    </ActionIcon>
  );
}

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CloseButton;
