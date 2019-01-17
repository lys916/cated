const miscReducer = (state = {loading: false}, action) => {
	switch (action.type) {
		case 'ORDERING':
         return {...state, loading: true};
      
      case 'ORDER_MADE':
         return {...state, loading: false};
         
		default:
			return state;
	}
};

export default miscReducer;