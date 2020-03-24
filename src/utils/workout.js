import React from "react";
import moment from "moment";

export const getWorkouts = ({ a = 0, b = 0 }) => {
	let workouts = [];
	if (a == 0) {
		workouts.push("overhead", "chinup");
	} else {
		workouts.push("bench", "row");
	}
	if (b == 0 || b == 2) {
		workouts.push("squat");
	} else {
		workouts.push("deadlift");
	}
	return workouts;
};

export const getDisplayName = name => {
	switch (name) {
		case "bench":
			return "Bench Press";
		case "row":
			return "Row";
		case "squat":
			return "Squat";
		case "deadlift":
			return "Deadlift";
		case "overhead":
			return "Overhead Press";
		case "chinup":
			return "Chin-Ups";
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

export const getMonthWorkouts = workouts => {
	let dates = {};
	workouts.forEach(workout => {
		let month = moment(workout.created).format("MMMM");
		let day = parseInt(moment(workout.created).format("D"));
		if (dates.hasOwnProperty(month)) {
			dates[month].push(day);
		} else {
			dates[month] = [day];
		}
	});
	return dates;
};

export const getWorkoutIds = (workouts, currentMonth) => {
	let dates = {};
	workouts.forEach(workout => {
		let month = moment(workout.created).format("MMMM");

		if (month == currentMonth) {
			let day = parseInt(moment(workout.created).format("D"));
			if (!dates.hasOwnProperty(day)) {
				dates[day] = workout.id;
			}
		}
	});
	return dates;
};

export const getWorkoutDays = (start, daysInMonth) => {
	let workoutDays = [];
	let checkEven = start % 2 == 0;
	let weekday = start + 1;
	for (let d = 1; d <= daysInMonth; d++) {
		if (checkEven) {
			if (d % 2 == 0) workoutDays.push(d);
		} else {
			if (d % 2 !== 0) workoutDays.push(d);
		}
		if (weekday == 7) {
			weekday = 0;
			checkEven = !checkEven;
		}
		weekday++;
	}
	return workoutDays;
};

export const getEmoji = () => {
	const emojis = ["🏋️‍♂️", "🏋️‍♀️", "🔥", "💪", "🙌", "👍"];
	const random = Math.floor(Math.random() * (emojis.length - 1));
	return emojis[random];
};

export const roundWeight = weight => {
	const multiplier = Math.pow(10, 1);
	return Math.round(weight * multiplier) / multiplier;
};
