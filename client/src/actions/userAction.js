import { fireDatabase, fireAuth } from "../config/firebase";


export const createUser = (user) => {
	return (dispatch) => {
		fireAuth.createUserWithEmailAndPassword(user.email, user.password)
		.then(function(res){
			localStorage.setItem('user', JSON.stringify(res.user));
			const user = localStorage.getItem('user');
			console.log('local user', user);
			dispatch({
				type: 'LOGGED_IN',
				payload: res.user
			});

		}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
		});
	}
}

export const signIn = (user) => {
	return (dispatch) => {
		fireAuth.signInWithEmailAndPassword(user.email, user.password)
		.then(function(res){
			localStorage.setItem('user', JSON.stringify(res.user));
			const user = localStorage.getItem('user');
			dispatch({
				type: 'LOGGED_IN',
				payload: res.user
			});

		}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
		});
	}
}

export const signOut = (history) => {
	return (dispatch) => {
		fireAuth.signOut().then(function() {
			localStorage.removeItem('user');
			dispatch({ type: 'LOGGED_OUT' });
			history.push('/login');
		 }).catch(function(error) {
			// An error happened.
			alert('Unable to sign out');
			console.log(error);
		});
	}
  }
