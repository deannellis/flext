import React, { useState } from 'react';
import { RightArrowIcon, DownArrowIcon } from '../utils/icons';

const ProgramCard = () => {
	const [detailsOpen, setDetailsOpen] = useState(false);
	const handleDetails = () => {
		setDetailsOpen(!detailsOpen);
	};
	return (
		<div className="program-card card">
			<h2>Program</h2>
			<div>
				<h3>Day 1</h3>
				<ul>
					<li>3x5 Overhead Press/Bench Press (alternating)</li>
					<li>3x5 Chinups/Barbell Rows (alternating)</li>
					<li>Squats</li>
				</ul>
			</div>
			<div>
				<h3>Day 2</h3>
				<ul>
					<li>3x5 Overhead Press/Bench Press (alternating)</li>
					<li>3x5 Chinups/Barbell Rows (alternating)</li>
					<li>Deadlifts</li>
				</ul>
			</div>
			<div>
				<h3>Day 3</h3>
				<ul>
					<li>3x5 Overhead Press/Bench Press (alternating)</li>
					<li>3x5 Chinups/Barbell Rows (alternating)</li>
					<li>Squats</li>
				</ul>
			</div>
			<div className="program-card__details">
				<h3 onClick={handleDetails}>
					{detailsOpen ? (
						<DownArrowIcon size={14} />
					) : (
						<RightArrowIcon size={14} />
					)}
					Details
				</h3>
				{/* {detailsOpen && (
					<div className="program-card__details-area">
						<ul>
							<li>Last Set is As Many Reps as Possible (AMRAP)</li>
							<li>
								Weight increases by 2.5lbs for upperbody, 5lbs for lower body
							</li>
							<li>
								If you complete 10+ reps in the final AMRAP set, the weight
								increase doubles
							</li>
							<li>
								If you fail to complete 5 reps in the final set, weight reduces
								by 10%
							</li>
						</ul>
						<p>
							Based on the &nbsp;
							<a href="https://www.google.com/search?q=change" target="blank">
								Phraks Greyskull LP
							</a>
							&nbsp; program
						</p>
					</div>
				)} */}
				<div
					className={
						detailsOpen
							? 'program-card__details-area'
							: 'program-card__details-area--closed'
					}
				>
					<ul>
						<li>Last Set is As Many Reps as Possible (AMRAP)</li>
						<li>
							Weight increases by 2.5lbs for upperbody, 5lbs for lower body
						</li>
						<li>
							If you complete 10+ reps in the final AMRAP set, the weight
							increase doubles
						</li>
						<li>
							If you fail to complete 5 reps in the final set, weight reduces by
							10%
						</li>
					</ul>
					<p>
						Based on the &nbsp;
						<a href="https://www.google.com/search?q=change" target="blank">
							Phraks Greyskull LP
						</a>
						&nbsp; program
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProgramCard;
