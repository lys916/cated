// import { fireDatabase, fireAuth } from "../config/firebase";
import { tranRef } from "../config/firebase";


export const addToCart = (item) => {
    console.log(item);
	return ({
        type: 'ADD_TO_CART',
        payload: item
    })
}

export const removeFromCart = (id) => {
	return ({
        type: 'REMOVE_FROM_CART',
        payload: id
    })
}
// ref.orderByChild("height").equalTo(25).on("child_added", function(snapshot) {
//     console.log(snapshot.key);
//   });

// export const fetchTrans = (email) => {
//     console.log('fetching');
//     return (dispatch) => {
//         tranRef.orderByChild('email').equalTo(email).on("value", snapshot => {
//             console.log('snapshot', snapshot.val());
//             console.log('tran snapshot', snapshot.val());
//             dispatch({
//               type: 'FETCHED_TRANS',
//               payload: snapshot.val()
//             });
//           });
//     }
// }
// export const signIn = (user) => {
// 	return (dispatch) => {
// 		fireAuth.signInWithEmailAndPassword(user.email, user.password)
// 		.then(function(res){
// 			localStorage.setItem('user', JSON.stringify(res.user));
// 			const user = localStorage.getItem('user');
// 			console.log('local user', user);
// 			dispatch({
// 				type: 'LOGGED_IN',
// 				payload: res.user
// 			});

// 		}).catch(function(error) {
// 		// Handle Errors here.
// 		var errorCode = error.code;
// 		var errorMessage = error.message;
// 		if (errorCode == 'auth/weak-password') {
// 			alert('The password is too weak.');
// 		} else {
// 			alert(errorMessage);
// 		}
// 		console.log(error);
// 		});
// 	}
// }

// export const signOut = (history) => {
// 	return (dispatch) => {
// 		fireAuth.signOut().then(function() {
// 			localStorage.removeItem('user');
// 			dispatch({ type: 'LOGGED_OUT' });
// 			history.push('/login');
// 		 }).catch(function(error) {
// 			// An error happened.
// 			alert('Unable to sign out');
// 			console.log(error);
// 		});
// 	}
//   }
