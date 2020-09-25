import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OutsideClick extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.wrapperRef = React.createRef();
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside(e) {
		if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
			this.props.onClickOutside();
		}
	}

	render() {
		return <div ref={this.wrapperRef}>{this.props.children}</div>;
	}
}
OutsideClick.propTypes = {
	children: PropTypes.element.isRequired,
	onClickOutside: PropTypes.func.isRequired,
};

export default OutsideClick;
