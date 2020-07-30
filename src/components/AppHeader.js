import React from 'react';
import PropTypes from 'prop-types';
import { HamburgerIcon } from '../utils/icons';

const AppHeader = ({ toggleMenu, pageHasMenu }) => {
	return (
		<div
			className={pageHasMenu ? 'app-header' : 'app-header app-header--no-menu'}
		>
			<button
				type="button"
				className="app-header__hamburger-button"
				onClick={() => {
					toggleMenu();
				}}
			>
				<HamburgerIcon size={24} />
			</button>
			<h1>flext</h1>
		</div>
	);
};
AppHeader.propTypes = {
	toggleMenu: PropTypes.func.isRequired,
	pageHasMenu: PropTypes.bool
};
AppHeader.defaultProps = {
	pageHasMenu: true
};

export default AppHeader;
