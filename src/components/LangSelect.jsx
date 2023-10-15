import { Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import engFlag from '../assets/icons/eng.svg';
import ukrFlag from '../assets/icons/ua.svg';
import styles from './styles/LangSelect.module.css';

export const dataLang = [
  { name: 'ENG', value: engFlag, key: 'en', color: 'blue' },
  { name: 'UKR', value: ukrFlag, key: 'ua', color: 'green' },
];

const LangSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);

  const { t } = useTranslation();

  const query = searchParams.get('lang') || '';
  const currentLanguage = i18n.language;

  useEffect(() => {
    i18n?.changeLanguage(query);
  }, [i18n, query]);

  const handleButtonClick = () => {
    const selectedLanguage = currentLanguage === 'en' ? 'ua' : 'en';
    setIsFlipped(!isFlipped);
    setSearchParams({ lang: selectedLanguage });
  };

  return (
    <Flex style={{ alignItems: 'center' }}>
      <button className={styles.langButton} onClick={handleButtonClick}>
        <p>{t('sidebar.changeLanguage')}</p>
        <div
          className={styles.langBox}
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div
            className={styles.langSide}
            style={{
              backgroundImage: `url(${
                dataLang.find((lang) => lang.key === currentLanguage)?.value
              })`,
            }}
          />
          <div
            className={styles.langSide}
            style={{
              backgroundImage: `url(${
                dataLang.find((lang) => lang.key !== currentLanguage)?.value
              })`,
            }}
          />
        </div>
      </button>
    </Flex>
  );
};

export default LangSelect;
