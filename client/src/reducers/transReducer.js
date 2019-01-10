const transReducer = (state = {}, action) => {
	switch (action.type) {
		case 'FETCHED_TRANS':
			if(!action.payload){
				return state;
			}
			return action.payload;

		default:
			return state;
	}
};

export default transReducer;