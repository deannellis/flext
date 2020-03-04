const filtersReducerDefaultState = {
	lift: ""
};

export default (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case "SET_WORKOUTS_FILTER":
			return {
				...state,
				lift: action.lift
			};
		default:
			return state;
	}
};
