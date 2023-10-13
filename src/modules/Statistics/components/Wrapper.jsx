import PropTypes from 'prop-types';

Wrapper.propTypes = {
	children: PropTypes.node.isRequired,
};

export function Wrapper({ children }) {
	return <div>{children}</div>;
}
