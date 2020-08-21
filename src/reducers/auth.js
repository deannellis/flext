export default (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				uid: action.uid,
			};
		case 'LOGOUT':
			return {};
		case 'FART':
			console.log('FARRRRT!');
			return state;
		case 'POOP':
			console.log('POOOOOOP!');
			return state;
		default:
			return state;
	}
};
