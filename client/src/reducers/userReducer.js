import { fireAuth } from "../config/firebase";



let userInit = null;

const user = JSON.parse(localStorage.getItem('user'));
if(user){
	userInit = user;
}

const userReducer = (state = userInit, action) => {
	switch (action.type) {

		case 'LOGGED_IN':
			return action.payload

		case 'LOGGED_OUT':
			return null

		default:
			return state;
	}
};

export default userReducer;