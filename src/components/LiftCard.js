import React from 'react';
import PropTypes from 'prop-types';

import { getDisplayName } from '../utils/workout';
import Button from './Button';
import UpdateWeightForm from '../forms/UpdateWeightForm';

const LiftCard = ({ lift, weights, formIsOpen, toggleForm, updateWeight }) => {
	return (
		<div className="card lift-card" style={{ minHeight: '30.8rem' }}>
			<div>
				<h2>{getDisplayName(lift)}</h2>
				<p>Work Weight:</p>
				<div className="lift-card__weight">
					<p>
						{Math.round(weights[lift])}
						<span>lbs</span>
					</p>
				</div>
			</div>
			<Button clickHandler={toggleForm}>Edit weight</Button>
			<div
				className={
					formIsOpen ? 'card__overlay' : 'card__overlay  card__overlay--hidden'
				}
			>
				<UpdateWeightForm
					currentWeight={weights[lift]}
					lift={lift}
					toggleForm={toggleForm}
					updateWeight={updateWeight}
				/>
			</div>
		</div>
	);
};
LiftCard.propTypes = {
	lift: PropTypes.string,
	weights: PropTypes.shape({
		bench: PropTypes.number,
		row: PropTypes.number,
		squat: PropTypes.number,
		deadlift: PropTypes.number,
		overhead: PropTypes.number,
	}),
	formIsOpen: PropTypes.bool,
	toggleForm: PropTypes.func.isRequired,
	updateWeight: PropTypes.func.isRequired,
};
LiftCard.defaultProps = {
	lift: 'bench',
	weights: {
		bench: 0,
		row: 0,
		squat: 0,
		deadlift: 0,
		overhead: 0,
	},
	formIsOpen: false,
};

export default LiftCard;
