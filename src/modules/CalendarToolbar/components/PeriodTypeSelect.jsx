import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function PeriodTypeSelect({ currentDate }) {
  const navigate = useNavigate();

  console.log(currentDate);

  const tabsToggler = (tabName) => {
    if (tabName === 'month') {
      navigate(`/calendar/month/${new Date().toISOString().slice(0, 7)}`);
    } else {
      navigate(`/calendar/day/${new Date().toISOString().slice(0, 10)}`);
    }
  };

  return (
    <div>
      <button onClick={() => tabsToggler('month')}>Month</button>
      <button onClick={() => tabsToggler('day')}>Day</button>
    </div>
  );
}

export default PeriodTypeSelect;

PeriodTypeSelect.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
};
