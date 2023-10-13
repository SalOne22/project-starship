import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import css from '../styles/LogoutButton.module.css';

function LogoutButton({ className }) {
  return (
    <Button
      className={clsx(css.logout, className)}
      radius="lg"
      rightSection={<IconLogout width={18} height={18} />}
      classNames={{
        section: css.section,
      }}
    >
      Log out
    </Button>
  );
}

LogoutButton.propTypes = {
  className: PropTypes.string,
};

export default LogoutButton;
