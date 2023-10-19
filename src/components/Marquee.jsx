import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import theme from '@/theme';

import css from './styles/TextMarquee.module.css';

function Marquee({
  className,
  width = '100%',
  duration = '15s',
  component = Text,
  breakpoint,
  ...props
}) {
  const C = component;

  const isMatchesBreakpoint = useMediaQuery(
    `(min-width: ${theme.breakpoints[breakpoint]})`,
  );

  return (
    <Box
      className={clsx(css.marquee, isMatchesBreakpoint && css.unset)}
      style={{ '--_width': width, '--_duration': duration }}
    >
      <C className={clsx(className, css.text)} {...props} />
    </Box>
  );
}

Marquee.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  duration: PropTypes.string,
  component: PropTypes.elementType,
  breakpoint: PropTypes.string,
};

export default Marquee;
