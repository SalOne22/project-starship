import { IconCirclePlus } from '@tabler/icons-react';
import css from '../styles/ColumnHeadBar.module.css';
import PropTypes from 'prop-types';

function ColumnHeadBar({ title, onClick }) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>{title}</h2>
      <button onClick={onClick} className={css.button}>
        <IconCirclePlus />
      </button>
    </div>
  );
}

ColumnHeadBar.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default ColumnHeadBar;
