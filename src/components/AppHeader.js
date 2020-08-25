import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HamburgerIcon } from '../utils/icons';
import Button from './Button';
import { startLogout } from '../actions/auth';

class AppHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuIsOpen: false,
		};
	}

	render() {
		const {
			toggleMenu,
			pageHasMenu,
			startLogout,
			photoUrl,
			displayName,
			email,
		} = this.props;
		return (
			<div
				className={
					pageHasMenu ? 'app-header' : 'app-header app-header--no-menu'
				}
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
					<img
						className={
							this.state.menuIsOpen ? 'app-header__profile-pic--active' : ''
						}
						src={photoUrl ? photoUrl : './images/defaultUser.png'}
						alt="user"
						onClick={() => {
							this.setState((prevState) => ({
								menuIsOpen: !prevState.menuIsOpen,
							}));
						}}
					/>
				</div>
				<div
					className={
						this.state.menuIsOpen
							? 'app-header__menu'
							: 'app-header__menu--hidden'
					}
				>
					<img
						src={photoUrl ? photoUrl : './images/defaultUser.png'}
						alt="user"
					/>
					<p>
						<strong>{displayName}</strong>
					</p>
					<p>{email}</p>
					<div>
						<Button
							clickHandler={() => {
								startLogout();
							}}
						>
							Log out
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
AppHeader.propTypes = {
	toggleMenu: PropTypes.func.isRequired,
	pageHasMenu: PropTypes.bool,
};
AppHeader.defaultProps = {
	pageHasMenu: true,
};

const mapStateToProps = (state) => ({
	photoUrl: state.auth.photoUrl,
	displayName: state.auth.displayName,
	email: state.auth.email,
});
const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
