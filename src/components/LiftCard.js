import React from 'react';

import { getDisplayName, roundWeight } from '../utils/workout';
import Button from './Button';
import UpdateWeightForm from '../forms/UpdateWeightForm';

const LiftCard = ({ lift, weights, formIsOpen, toggleForm, updateWeight }) => {
    return (
        <div className="card lift-card" style={{'minHeight': '30.8rem'}}>
            <div>
                <h2>{getDisplayName(lift)}</h2>
                    <p>Work Weight:</p>
                <div className="lift-card__weight">
                    <p>
                        {roundWeight(weights[lift])}
                        <span>lbs</span>
                    </p>
                </div>
            </div>
            <Button clickHandler={toggleForm}>Edit weight</Button>
            <div className={formIsOpen ? 'card__overlay' : 'card__overlay  card__overlay--hidden' }>
                <UpdateWeightForm 
                    currentWeight={weights[lift]}
                    lift={lift}
                    toggleForm={toggleForm}
                    updateWeight={updateWeight}
                />
            </div>
        </div>
    );
}

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
    toggleForm: () => {console.log('toggle form (default prop)')},
    updateWeight: () => {console.log('update weight (default prop)')},
};
 
export default LiftCard;
