import { ActionIcon, Dialog } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import IconEngFlag from '@/assets/icons/eng.svg?react';
import IconUkrFlag from '@/assets/icons/ua.svg?react';

import css from './styles/LangSelect.module.css';

const LangSelect = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const handleButtonClick = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Dialog
      opened
      w="fit-content"
      size="xs"
      mih={0}
      py={8}
      px={8}
      className={css.dialog}
    >
      <ActionIcon.Group>
        <ActionIcon
          className={css.iconButton}
          aria-label="set english language"
          disabled={currentLanguage === 'en'}
          variant="subtle"
          onClick={() => handleButtonClick('en')}
        >
          <IconEngFlag style={{ width: '75%', height: '75%' }} />
        </ActionIcon>
        <ActionIcon
          className={css.iconButton}
          aria-label="встановити українську мову"
          disabled={currentLanguage === 'ua'}
          variant="subtle"
          onClick={() => handleButtonClick('ua')}
        >
          <IconUkrFlag style={{ width: '75%', height: '75%' }} />
        </ActionIcon>
      </ActionIcon.Group>
    </Dialog>
  );
};

export default LangSelect;
