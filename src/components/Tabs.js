import React from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ labels, activeIndex, handleSelect, children }) => {
	return (
		<>
			<div className="tabs__tablist">
				{labels.map((label, i) => (
					<button
						className={
							activeIndex === i ? 'tabs__tab--active tabs__tab' : 'tabs__tab'
						}
						onClick={() => {
							handleSelect(i);
						}}
						key={`tab-${label}`}
						type="button"
					>
						{label}
					</button>
				))}
			</div>
			<div className="tabs__tab-content">{children}</div>
		</>
	);
};
Tabs.propTypes = {
	labels: PropTypes.arrayOf(PropTypes.string).isRequired,
	activeIndex: PropTypes.number,
	handleSelect: PropTypes.func.isRequired,
	children: PropTypes.arrayOf(PropTypes.element),
};
Tabs.defaultProps = {
	activeIndex: 0,
	children: undefined,
};

export default Tabs;
