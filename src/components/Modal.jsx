import { Box, Overlay, CloseButton } from '@mantine/core';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import css from './styles/Modal.module.css';
import clsx from 'clsx';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const closeModalByEsc = (e) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', closeModalByEsc);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', closeModalByEsc);
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay
      color="white"
      backgroundOpacity={0.35}
      blur={3}
      center
      fixed
      onMouseDown={handleOverlayClick}
      className={clsx(css.overlay, isVisible && css.active)}
    >
      <Box className={clsx(css.modal, !isVisible && css.closing)}>
        <CloseButton
          aria-label={t('common.closeModal')}
          classNames={{ root: css.closeBtn }}
          onClick={closeModal}
        />
        {children}
      </Box>
    </Overlay>,
    modalRoot,
  );
}

export default Modal;
