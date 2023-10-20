import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

ResponsiveChartWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export function ResponsiveChartWrapper({ children }) {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateDimensions = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return React.cloneElement(children, dimensions);
}
