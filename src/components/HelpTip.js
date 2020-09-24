import React from 'react';
import { InfoIcon } from '../utils/icons';

const HelpTip = ({ helpText }) => {
	return (
		<div className="help-tip">
			<InfoIcon size="24" />
			<span className="help-tip__tip">{helpText}</span>
		</div>
	);
};

export default HelpTip;
