import getVisibleWorkouts from "../../utils/selectors";
import {
	workouts
} from "../fixtures/workout";

test("should filter by lift value", () => {
	const filters = {
		lift: "overhead"
	};
	const filteredWorkouts = getVisibleWorkouts(workouts, filters);
	expect(filteredWorkouts).toEqual([workouts[0], workouts[2]]);
});