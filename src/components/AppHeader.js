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
			onStartLogout,
			photoUrl,
			displayName,
			email,
			isAuthenticated,
		} = this.props;
		const { menuIsOpen } = this.state;

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
					{isAuthenticated && (
						<button
							type="button"
							onClick={() => {
								this.setState((prevState) => ({
									menuIsOpen: !prevState.menuIsOpen,
								}));
							}}
						>
							<img
								className={menuIsOpen ? 'app-header__profile-pic--active' : ''}
								src={photoUrl ? photoUrl : './images/defaultUser.png'}
								alt="user"
							/>
						</button>
					)}
				</div>
				<div
					className={
						menuIsOpen ? 'app-header__menu' : 'app-header__menu--hidden'
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
								this.setState({ menuIsOpen: false });
								onStartLogout();
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
	onStartLogout: PropTypes.func.isRequired,
	pageHasMenu: PropTypes.bool,
	photoUrl: PropTypes.string,
	displayName: PropTypes.string,
	email: PropTypes.string,
	isAuthenticated: PropTypes.bool.isRequired,
};
AppHeader.defaultProps = {
	pageHasMenu: true,
	photoUrl: null,
	displayName: null,
	email: null,
};

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.uid,
	photoUrl: state.auth.photoUrl,
	displayName: state.auth.displayName,
	email: state.auth.email,
});
const mapDispatchToProps = (dispatch) => ({
	onStartLogout: () => dispatch(startLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
