import filtersReducer from "../../reducers/filters";

const defaultState = {
	lift: ""
};

test("should set default state", () => {
	const state = filtersReducer(undefined, { type: "@@INIT" });
	expect(state).toEqual(defaultState);
});

test("should set lift filter value", () => {
	const lift = "bench";
	const action = {
		type: "SET_WORKOUTS_FILTER",
		lift
	};
	const state = filtersReducer(defaultState, action);

	expect(state).toEqual({
		lift
	});
});
