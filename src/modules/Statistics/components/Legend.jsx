// import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classes from '../styles/Statistics.module.css';
import { Box, Text } from '@mantine/core';

export function Legend() {
  const { t } = useTranslation();
  return (
    <Box className={classes.stat__legendContainer}>
      <Box className={classes.stat__legendItem}>
        <span
          className={`${classes.stat__legendDot} ${classes.stat__legendDot_color_pink}`}
        ></span>
        <Text tt="capitalize">{t('statistics.byDay')}</Text>
      </Box>
      <Box className={classes.stat__legendItem}>
        <span
          className={`${classes.stat__legendDot} ${classes.stat__legendDot_color_blue}`}
        ></span>
        <Text tt="capitalize">{t('statistics.byMonth')}</Text>
      </Box>
    </Box>
  );
}
