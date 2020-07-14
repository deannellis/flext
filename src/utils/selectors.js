export default (workouts, {
	lift
}) => {
	if (lift === '') return workouts;
	const visibleWorkouts = workouts.filter(workout => Object.keys(workout).includes(lift));
	return visibleWorkouts;
};
