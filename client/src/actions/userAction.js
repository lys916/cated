import axios from 'axios';

export const signIn = (user) => {
	if(user.email !== '' || user.password !== ''){
	   return (dispatch) => {
		   dispatch({
		      type: 'LOGGING_IN'
		   });
		   axios.post(`user/login`, user).then(res => {
		      if(res.data.errorMessage){
               dispatch({
                  type: 'USER_ERROR_MESSAGE',
                  payload: res.data.errorMessage
               });
		      }else{
			      localStorage.setItem('user', JSON.stringify(res.data));
			      dispatch({
						type: 'LOGGED_IN',
						payload: res.data
					});
		  		}
			});
	  	}
	}else{
	  	return({
			type: 'USER_ERROR_MESSAGE',
			payload: 'Please enter username and password.'
	  	});
	}
}

export const signUp = (user) => {
	if(user.email !== '' || user.name !== '' || user.password !== ''){
	  	return (dispatch) => {
			dispatch({
		  		type: 'SIGNING_UP'
			});
			axios.post(`user/signup`, user).then(res => {
				if(res.data.errorMessage){
					dispatch({
						type: 'USER_ERROR_MESSAGE',
						payload: res.data.errorMessage
					});
				}else{
					alert("You have successfully signed up and logged in.");
						localStorage.setItem('user', JSON.stringify(res.data));
					dispatch({
						type: 'LOGGED_IN',
						payload: res.data
					});
				}
			});
	  	}
	}else{
	 	 return({
			type: 'USER_ERROR_MESSAGE',
			payload: 'Please enter username and password.'
	  	});
	}
}

export const signOut = () => {
	localStorage.removeItem('user');
	return ({ type: 'LOGGED_OUT' });
}
