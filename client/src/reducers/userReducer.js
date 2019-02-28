let userInit = null;

const user = JSON.parse(localStorage.getItem('user'));
if(user){
   userInit = user;
}

console.log('enviroment?', process.env);

const userReducer = (state = userInit, action) => {
	switch (action.type) {
      case 'LOGGED_IN':
         localStorage.setItem('user', JSON.stringify(action.payload));
         return action.payload 

		case 'LOGGED_OUT':
			return null

		default:
			return state;
	}
};

export default userReducer;