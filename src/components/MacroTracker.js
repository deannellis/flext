import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import PieChart from './PieChart';
import { DotsIcon } from '../utils/icons';
import UpdateMacroForm from '../forms/UpdateMacroForm';
import SetMacrosForm from '../forms/SetMacrosForm';

const getPieSlices = (target, current) => {
	let leftover = 0;
	const pieData = [];
	const keys = Object.keys(current);

	keys.forEach((key) => {
		const item = {};
		item.macro = key;
		if (current[key] !== null) {
			if (current[key] <= target[key]) {
				item.amount = current[key];
				const diff = target[key] - current[key];
				leftover += diff;
			} else {
				item.amount = target[key];
			}
		} else {
			item.amount = 0;
			leftover += target[key];
		}
		pieData.push(item);
	});

	if (leftover !== 0) {
		const leftoverObject = {
			macro: 'leftover',
			amount: leftover,
		};
		pieData.push(leftoverObject);
	}
	return pieData;
};

class MacroTracker extends Component {
	constructor(props) {
		super(props);
		// const { target, current } = this.props.macros;
		this.state = {
			displayUpdateForm: false,
			displayOptionsMenu: false,
			// data: getPieSlices(target, current),
		};
	}

	onSubmitMacros = (macros) => {
		const { updateMacro } = this.props;
		this.setState({ displayUpdateForm: false });
		updateMacro(macros);
	};

	onSetMacros = (macros, closeMenu) => {
		const { setMacros } = this.props;
		setMacros(macros);
		if (closeMenu) this.setState({ displayOptionsMenu: false });
	};

	render() {
		const { macros } = this.props;
		const { target, current } = macros;
		const { displayOptionsMenu, displayUpdateForm } = this.state;
		const targetKeys = Object.keys(target);

		return (
			<div className="macro-tracker card">
				<div className="macro-tracker__header">
					<h2>Macros</h2>
					<button
						onClick={() => {
							this.setState({ displayOptionsMenu: true });
						}}
						className="macro-tracker__menu-button"
						type="button"
					>
						<DotsIcon size={24} />
					</button>
				</div>
				{target.protein === null ? (
					<>
						<p>Enter Your Macros</p>
						<p className="macro-tracker__helper-text">
							Not sure what your macros are?
							<br />
							There are{' '}
							<a
								href="https://www.google.com/search?q=calculating+macros+for+muscle+gain"
								target="blank"
							>
								several calculators
							</a>{' '}
							online.
						</p>
						<SetMacrosForm
							submitMacros={(enteredMacros) => {
								const { setMacros } = this.props;
								setMacros(enteredMacros);
							}}
						/>
					</>
				) : (
					<>
						<PieChart data={getPieSlices(target, current)} />
						<div className="macro-tracker__macros">
							{targetKeys.map((macro, i) => (
								<div className="macro-tracker__macro" key={macro}>
									<div
										className="macro-tracker__macro-key"
										id={`macro-key-${i}`}
									/>
									<p>
										<span>{macro}</span>
										{` ${current[macro] !== null ? current[macro] : 0} of ${
											target[macro]
										} grams`}
									</p>
								</div>
							))}
						</div>
						<Button
							clickHandler={() => {
								this.setState({ displayUpdateForm: true });
							}}
							variant="primary"
						>
							Add macros
						</Button>
						<Button
							clickHandler={() => {
								const { resetMacros } = this.props;
								resetMacros('current');
							}}
						>
							reset macros
						</Button>
					</>
				)}
				<div
					className={
						displayUpdateForm
							? 'macro-tracker__overlay card__overlay'
							: 'macro-tracker__overlay card__overlay  card__overlay--hidden'
					}
				>
					<UpdateMacroForm
						updateMacro={this.onSubmitMacros}
						closeForm={() => {
							this.setState({ displayUpdateForm: false });
						}}
					/>
				</div>
				<div
					className={
						displayOptionsMenu
							? 'macro-tracker__overlay card__overlay macro-tracker__menu'
							: 'macro-tracker__overlay card__overlay  card__overlay--hidden macro-tracker__menu'
					}
				>
					<p>Update Target Macros</p>
					<SetMacrosForm
						submitMacros={this.onSetMacros}
						current={macros.target}
					/>
					<div className="macro-tracker__menu-bottom">
						<Button
							clickHandler={() => {
								this.setState({ displayOptionsMenu: false });
							}}
						>
							Close Menu
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
MacroTracker.propTypes = {
	macros: {
		target: {
			protein: PropTypes.number,
			carbs: PropTypes.number,
			fat: PropTypes.number,
		},
		current: {
			protein: PropTypes.number,
			carbs: PropTypes.number,
			fat: PropTypes.number,
		},
	},
	setMacros: PropTypes.func.isRequired,
	updateMacro: PropTypes.func.isRequired,
	resetMacros: PropTypes.func.isRequired,
};
MacroTracker.defaultProps = {
	macros: {
		target: {
			protein: 0,
			carbs: 0,
			fat: 0,
		},
		current: {
			protein: 0,
			carbs: 0,
			fat: 0,
		},
	},
};

export default MacroTracker;
