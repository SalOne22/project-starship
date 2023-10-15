import PropTypes from 'prop-types';
import classes from '../Statistics.module.css';

ChartTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export function ChartTitle({ children }) {
  return <h2 className={classes.stat__chartTitle}>{children}</h2>;
}
