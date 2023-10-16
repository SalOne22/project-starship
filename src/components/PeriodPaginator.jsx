import PropTypes from 'prop-types';

function PeriodPaginator({ nameOfDate, prevDate, nextDate, isDisabled }) {
  return (
    <div>
      <button>{nameOfDate}</button>
      <button onClick={prevDate} disabled={isDisabled}>
        arrow_back
      </button>
      <button onClick={nextDate}>arrow_forward</button>
    </div>
  );
}

export default PeriodPaginator;

PeriodPaginator.propTypes = {
  nameOfDate: PropTypes.string.isRequired,
  prevDate: PropTypes.func.isRequired,
  nextDate: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};
