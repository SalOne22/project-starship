import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink } from '@mantine/core';
import { NavLink as RouterNavLink } from 'react-router-dom';

import css from '../styles/NavigationLink.module.css';

function NavigationLink({ icon, title, to }) {
  return (
    <NavLink
      className={css.link}
      renderRoot={({ className, ...others }) => (
        <RouterNavLink
          className={({ isActive }) =>
            clsx(className, { [css.active]: isActive })
          }
          {...others}
        />
      )}
      to={to}
      label={title}
      leftSection={icon}
      classNames={{
        section: css.section,
        label: css.label,
        body: css.label,
      }}
    />
  );
}

NavigationLink.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavigationLink;
