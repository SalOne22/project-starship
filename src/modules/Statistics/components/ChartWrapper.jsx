import PropTypes from 'prop-types';

ChartWrapper.propTypes = {
	children: PropTypes.node.isRequired,
};

export function ChartWrapper({ children }) {
	return <div>{children}</div>;
}
