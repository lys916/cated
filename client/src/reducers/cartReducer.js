import { CardActions } from "../../node_modules/@material-ui/core";

let initCart = [];
const localCart = JSON.parse(localStorage.getItem('cart'));
if(localCart){
	initCart = localCart
}
// localStorage.removeItem('cart');
console.log('localCart', localCart);
const cartReducer = (state = initCart, action) => {
	switch (action.type) {

		case 'ADD_TO_CART':
		localStorage.setItem('cart', JSON.stringify([...state, action.payload]));
		const cart = localStorage.getItem('cart');
		console.log('cart', cart);
			return [...state, action.payload];
			
		case "REMOVE_FROM_CART":
			const removeItem = state.filter(item=>{
				return item.id !== action.payload
			});
			localStorage.setItem('cart', JSON.stringify(removeItem));
			return removeItem;

		case 'ORDER_MADE':
			console.log(action.payload);
			localStorage.removeItem('cart');
			return [];


		default:
			return state;
	}
};

export default cartReducer;