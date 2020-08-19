import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HamburgerIcon } from '../utils/icons';
import Button from './Button';
import { startLogout } from '../actions/auth';

export const AppHeader = ({ toggleMenu, pageHasMenu, startLogout }) => {
	return (
		<div
			className={pageHasMenu ? 'app-header' : 'app-header app-header--no-menu'}
		>
			<div className="app-header__left-content">
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
			<div className="app-header__right-content">
				<Button
					clickHandler={() => {
						startLogout();
					}}
				>
					Log out
				</Button>
			</div>
		</div>
	);
};
AppHeader.propTypes = {
	toggleMenu: PropTypes.func.isRequired,
	pageHasMenu: PropTypes.bool,
};
AppHeader.defaultProps = {
	pageHasMenu: true,
};

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(AppHeader);
