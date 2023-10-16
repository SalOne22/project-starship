import PropTypes from 'prop-types';
import { Paper } from '@mantine/core';
import classes from '../Statistics.module.css';

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export function Wrapper({ children }) {
  return <Paper className={classes.stat__wrapper}>{children}</Paper>;
}
