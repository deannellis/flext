import { setWorkoutsFilter } from "../../actions/filters";

test("should return Set Workouts Filter object", () => {
	const lift = "bench";
	const action = setWorkoutsFilter(lift);

	expect(action).toEqual({
		type: "SET_WORKOUTS_FILTER",
		lift: "bench"
	});
});
