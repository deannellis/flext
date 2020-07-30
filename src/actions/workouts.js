import uuid from 'uuid';

export default ({ workout = {}, currentWeight = {}, created = 0 } = {}) => ({
	type: 'ADD_WORKOUT',
	id: uuid(),
	workout,
	currentWeight,
	created,
});
