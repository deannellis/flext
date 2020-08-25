export default (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				uid: action.uid,
				photoUrl: action.photoUrl,
				displayName: action.displayName,
				email: action.email,
			};
		case 'LOGOUT':
			return {};
		default:
			return state;
	}
};
