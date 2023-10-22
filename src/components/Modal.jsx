import { Box, Overlay, CloseButton } from '@mantine/core';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import css from './styles/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  const { t } = useTranslation();

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
      fixed
      onClick={handleOverlayClick}
    >
      <Box className={css.modal}>
        <CloseButton
          aria-label={t('common.closeModal')}
          classNames={{ root: css.closeBtn }}
          onClick={onClose}
        />
        {children}
      </Box>
    </Overlay>,
    modalRoot,
  );
}

export default Modal;
