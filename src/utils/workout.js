import moment from 'moment';

export const getWorkouts = ({ a = 0, b = 0 }) => {
	const workouts = [];
	if (a === 0) {
		workouts.push('overhead', 'chinup');
	} else {
		workouts.push('bench', 'row');
	}
	if (b === 0 || b === 2) {
		workouts.push('squat');
	} else {
		workouts.push('deadlift');
	}
	return workouts;
};

export const getDisplayName = name => {
	switch (name) {
		case 'bench':
			return 'Bench Press';
		case 'row':
			return 'Row';
		case 'squat':
			return 'Squat';
		case 'deadlift':
			return 'Deadlift';
		case 'overhead':
			return 'Overhead Press';
		case 'chinup':
			return 'Chin-Ups';
		default:
			return name;
	}
};

export const getWarmupWeights = workWeight => {
	const warmup25 = workWeight * 0.25 > 44 ? workWeight * 0.25 : 44;
	const warmup50 = workWeight * 0.5 > 44 ? workWeight * 0.5 : 44;
	const warmup75 = workWeight * 0.75 > 44 ? workWeight * 0.75 : 44;
	return [warmup25, warmup50, warmup75];
};

export const getWeightDistribution = weight => {
	if (weight === 44) {
		return [0, 44, 0];
	}
	const oneSide = (weight - 44) / 2;
	return [oneSide, 44, oneSide];
};

export const getMonthWorkouts = (workouts, year) => {
	const filteredWorkouts = workouts.filter(
		workout => moment(workout.created).format('YYYY') === year
	);
	const dates = {};
	filteredWorkouts.forEach(workout => {
		const month = moment(workout.created).format('MMMM');
		const day = parseInt(moment(workout.created).format('D'));
		if (Object.prototype.hasOwnProperty.call(dates, 'month')) {
			dates[month].push(day);
		} else {
			dates[month] = [day];
		}
	});
	return dates;
};

export const getWorkoutIds = (workouts, currentMonth) => {
	const dates = {};
	workouts.forEach(workout => {
		const month = moment(workout.created).format('MMMM');

		if (month === currentMonth) {
			const day = parseInt(moment(workout.created).format('D'));
			if (!Object.prototype.hasOwnProperty.call(dates, 'day')) {
				dates[day] = workout.id;
			}
		}
	});
	return dates;
};

export const getWorkoutDays = (start, daysInMonth) => {
	const workoutDays = [];
	let checkEven = start % 2 === 0;
	let weekday = start + 1;
	for (let d = 1; d <= daysInMonth; d += 1) {
		if (checkEven) {
			if (d % 2 === 0) workoutDays.push(d);
		} else if (d % 2 !== 0) {
			workoutDays.push(d);
		}
		if (weekday === 7) {
			weekday = 0;
			checkEven = !checkEven;
		}
		weekday += 1;
	}
	return workoutDays;
};

export const getEmoji = () => {
	const emojis = ['🏋️‍♂️', '🏋️‍♀️', '🔥', '💪', '🙌', '👍'];
	const random = Math.floor(Math.random() * (emojis.length - 1));
	return emojis[random];
};
