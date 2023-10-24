import css from '../styles/AddTaskButton.module.css';
import { IconPlus, IconInfoCircle } from '@tabler/icons-react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
function AddTaskButton({ children, onClick, isValidDate }) {
  const { t } = useTranslation();
  return (
    <button className={css.addButton} disabled={!isValidDate} onClick={onClick}>
      {!isValidDate && (
        <div className={css.tooltip}>
          <p className={css.tooltipText}>
            <IconInfoCircle /> {t('calendar.chosenday.taskColumns.tooltip')}
          </p>
        </div>
      )}
      <IconPlus style={{ marginRight: '8px' }} />
      {children}
    </button>
  );
}

AddTaskButton.propTypes = {
  children: propTypes.node,
  onClick: propTypes.func,
  isValidDate: propTypes.bool,
};

export default AddTaskButton;
