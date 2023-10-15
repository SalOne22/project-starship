import PropTypes from 'prop-types';
import classes from '../Statistics.module.css';
import { Box } from '@mantine/core';

ChartWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export function ChartWrapper({ children }) {
  return <Box className={classes.stat__chartWrapper}>{children}</Box>;
}
