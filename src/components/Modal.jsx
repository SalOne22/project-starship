import { Box, Overlay, CloseButton } from '@mantine/core';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import css from './styles/Modal.module.css';
import clsx from 'clsx';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  const { t } = useTranslation();
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const closeModalByEsc = (e) => {
      if (e.code === 'Escape') {
        setClosing(true);
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
      setClosing(true);
    }
  };

  const handleAnimationEnd = () => {
    if (closing) {
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
      <Box
        className={clsx(css.modal, closing ? css.closing : '')}
        onAnimationEnd={handleAnimationEnd}
      >
        <CloseButton
          aria-label={t('common.closeModal')}
          classNames={{ root: css.closeBtn }}
          onClick={() => setClosing(true)}
        />
        {children}
      </Box>
    </Overlay>,
    modalRoot,
  );
}

export default Modal;
