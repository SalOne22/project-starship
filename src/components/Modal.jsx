import {
  Box,
  Overlay,
  ActionIcon,
  createTheme,
  MantineThemeProvider,
} from '@mantine/core';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IconX } from '@tabler/icons-react';

import css from './styles/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: css,
    }),
  },
});

function Modal({ onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const closeModalByEsc = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeModalByEsc);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', closeModalByEsc);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay
      color="white"
      backgroundOpacity={0.35}
      blur={3}
      center
      onClick={handleOverlayClick}
    >
      <Box className={css.modal}>
        <MantineThemeProvider theme={theme}>
          <ActionIcon
            aria-label="Close modal"
            radius="xl"
            size={24}
            variant="transparent"
            className={css.closeBtn}
            onClick={onClose}
          >
            <IconX style={{ width: '100%', height: '100%' }} stroke={2} />
          </ActionIcon>
        </MantineThemeProvider>
        {children}
      </Box>
    </Overlay>,
    modalRoot,
  );
}

export default Modal;
