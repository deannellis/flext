import {
	getWorkouts,
	getDisplayName,
	getWarmupWeights,
	getWeightDistribution,
	getMonthWorkouts,
	getWorkoutIds,
	getWorkoutDays,
	getEmoji,
	roundWeight
} from "../../utils/workout";

import { workouts } from "../fixtures/workout";

describe("tests for getWorkouts fn", () => {
	test("should return correct lifts given lift variant: {a:0, b:0}", () => {
		const liftVariant = { a: 0, b: 0 };
		const workouts = getWorkouts(liftVariant);
		expect(workouts).toEqual(["overhead", "chinup", "squat"]);
	});
	test("should return correct lifts given lift variant: {a:1, b:1}", () => {
		const liftVariant = { a: 1, b: 1 };
		const workouts = getWorkouts(liftVariant);
		expect(workouts).toEqual(["bench", "row", "deadlift"]);
	});
	test("should return correct lifts given lift variant: {a:0, b:2}", () => {
		const liftVariant = { a: 0, b: 2 };
		const workouts = getWorkouts(liftVariant);
		expect(workouts).toEqual(["overhead", "chinup", "squat"]);
	});
});

describe("tests for getDisplayName fn", () => {
	test('should return correct display name given value "bench"', () => {
		const lift = "bench";
		const result = getDisplayName(lift);
		expect(result).toBe("Bench Press");
	});
	test('should return correct display name given value "row"', () => {
		const lift = "row";
		const result = getDisplayName(lift);
		expect(result).toBe("Row");
	});
	test('should return correct display name given value "squat"', () => {
		const lift = "squat";
		const result = getDisplayName(lift);
		expect(result).toBe("Squat");
	});
	test('should return correct display name given value "overhead"', () => {
		const lift = "overhead";
		const result = getDisplayName(lift);
		expect(result).toBe("Overhead Press");
	});
	test('should return correct display name given value "deadlift"', () => {
		const lift = "deadlift";
		const result = getDisplayName(lift);
		expect(result).toBe("Deadlift");
	});
	test('should return correct display name given value "chinup"', () => {
		const lift = "chinup";
		const result = getDisplayName(lift);
		expect(result).toBe("Chin-Ups");
	});
});

test("should return warm-up weights", () => {
	const workWeight = 100;
	const result = getWarmupWeights(workWeight);
	expect(result).toEqual([44, 50, 75]);
});

test("should return weight distribution", () => {
	const workWeight = 100;
	const result = getWeightDistribution(workWeight);
	expect(result).toEqual([28, 44, 28]);
});

test("should return an object with an array of dates for each month, given an array of workout data", () => {
	const result = getMonthWorkouts(workouts);
	expect(result).toEqual({
		December: [8],
		February: [6, 3]
	});
});

test("should return an object with an array of dates for each month, given an array of workout data", () => {
	const result = getWorkoutIds(workouts, "February");
	expect(result).toEqual({
		3: "de5f7586-8023-4b3a-bfcf-0ff72fe2c4d8",
		6: "7a07e348-e0e8-48c8-a60a-3d9fb9929ab5"
	});
});

describe("tests for getWorkoutDays fn", () => {
	test("should return an array of suggested workout dates, given month starts with even day of week", () => {
		const start = 0;
		const daysInMonth = 31;
		const result = getWorkoutDays(start, daysInMonth);
		expect(result).toEqual([2, 4, 6, 9, 11, 13, 16, 18, 20, 23, 25, 27, 30]);
	});
	test("should return an array of suggested workout dates, given month starts with odd day of week", () => {
		const start = 1;
		const daysInMonth = 31;
		const result = getWorkoutDays(start, daysInMonth);
		expect(result).toEqual([
			1,
			3,
			5,
			8,
			10,
			12,
			15,
			17,
			19,
			22,
			24,
			26,
			29,
			31
		]);
	});
});

test("should return a random emoji from list", () => {
	const emojis = ["🏋️‍♂️", "🏋️‍♀️", "🔥", "💪", "🙌", "👍"];
	const result = getEmoji();
	const resultIsEmoji = emojis.includes(result);
	expect(resultIsEmoji).toBe(true);
});

