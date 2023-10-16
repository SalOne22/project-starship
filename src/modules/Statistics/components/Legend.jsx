// import PropTypes from 'prop-types';
import classes from '../Statistics.module.css';
import { Box, Text } from '@mantine/core';

export function Legend() {
  return (
    <Box className={classes.stat__legendContainer}>
      <Box className={classes.stat__legendItem}>
        <span
          className={`${classes.stat__legendDot} ${classes.stat__legendDot_color_pink}`}
        ></span>
        <Text tt="capitalize">by day</Text>
      </Box>
      <Box className={classes.stat__legendItem}>
        <span
          className={`${classes.stat__legendDot} ${classes.stat__legendDot_color_blue}`}
        ></span>
        <Text tt="capitalize">by month</Text>
      </Box>
    </Box>
  );
}
