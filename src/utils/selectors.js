export const getVisibleWorkouts = (workouts, { lift }) => {
	if (lift === "") return workouts;
	const visibleWorkouts = workouts.filter(workout => {
		return Object.keys(workout).includes(lift);
	});
	return visibleWorkouts;
};
