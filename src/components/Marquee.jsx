import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Text } from '@mantine/core';
import { useElementSize, useMediaQuery } from '@mantine/hooks';

import theme from '@/theme';

import css from './styles/TextMarquee.module.css';

function Marquee({
  className,
  width = '100%',
  duration = '15s',
  component = Text,
  active = false,
  breakpoint,
  ...props
}) {
  const C = component;

  const { ref: componentRef, width: componentWidth } = useElementSize();
  const { ref: boxRef, width: boxWidth } = useElementSize();

  const isMatchesBreakpoint = useMediaQuery(
    `(min-width: ${theme.breakpoints[breakpoint]})`,
  );

  return (
    <Box
      className={clsx(
        css.marquee,
        (isMatchesBreakpoint || (componentWidth <= boxWidth && !active)) &&
          css.unset,
      )}
      style={{ '--_width': width, '--_duration': duration }}
    >
      <Box pos="absolute" ref={boxRef} w={width} h={0} />
      <C ref={componentRef} className={clsx(className, css.text)} {...props} />
    </Box>
  );
}

Marquee.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  duration: PropTypes.string,
  component: PropTypes.elementType,
  active: PropTypes.bool,
  breakpoint: PropTypes.string,
};

export default Marquee;
