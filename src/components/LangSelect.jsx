import { ActionIcon } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import IconEngFlag from '@/assets/icons/eng.svg?react';
import IconUkrFlag from '@/assets/icons/ua.svg?react';

const LangSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFlipped, setIsFlipped] = useState(false);
  const { pathname } = window.location;

  const { i18n } = useTranslation();

  const query = searchParams.get('lang') || '';
  const currentLanguage = i18n.language;

  useEffect(() => {
    i18n?.changeLanguage(query);
  }, [i18n, query]);

  useEffect(() => {
    if (!pathname.includes('lang')) setSearchParams({ lang: currentLanguage });
  }, [pathname]);

  const handleButtonClick = () => {
    const selectedLanguage = currentLanguage === 'en' ? 'ua' : 'en';

    setIsFlipped(!isFlipped);
    setSearchParams({ lang: selectedLanguage });
  };

  return (
    <ActionIcon
      w={{ base: 24, md: 32 }}
      h={{ base: 24, md: 32 }}
      variant="transparent"
      onClick={handleButtonClick}
    >
      {currentLanguage === 'en' ? (
        <IconEngFlag style={{ width: '75%', height: '75%' }} />
      ) : (
        <IconUkrFlag style={{ width: '75%', height: '75%' }} />
      )}
    </ActionIcon>
  );
};

export default LangSelect;
