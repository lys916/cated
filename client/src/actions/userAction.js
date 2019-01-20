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

export const signUp = (user, history) => {
   console.log('action user signing up', user);
	if(user.emailPhone !== '' || user.name !== '' || user.password !== ''){
	  	return (dispatch) => {
			dispatch({
		  		type: 'SIGNING_UP'
			});
			axios.post(`/user/signup`, user).then(res => {
				if(res.data.errorMessage){
					dispatch({
						type: 'USER_ERROR_MESSAGE',
						payload: res.data.errorMessage
					});
				}else{
               // alert("You have successfully signed up and logged in.");
               alert('User need to confirm');
                     dispatch({
                        type: 'TEMP_USER',
                        payload: res.data
                     });
                     history.push('/confirm');
                  
                     // localStorage.setItem('user', JSON.stringify(res.data));
                     // dispatch({
                     //    type: 'LOGGED_IN',
                     //    payload: res.data
                     // });
                  
					
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

export const confirmUser = (user) => {
	if(user.emailPhone !== '' || user.name !== '' || user.password !== ''){
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
               // alert("You have successfully signed up and logged in.");
               alert('User need to confirm');
                     dispatch({
                        type: 'SIGNED_UP',
                        payload: res.data
                     });
                  
                     // localStorage.setItem('user', JSON.stringify(res.data));
                     // dispatch({
                     //    type: 'LOGGED_IN',
                     //    payload: res.data
                     // });
                  
					
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
