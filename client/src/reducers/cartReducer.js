let initCart = [];
const localCart = JSON.parse(localStorage.getItem('cart'));

//assigning local cart
if(localCart){
	initCart = localCart
}

const cartReducer = (state = initCart, action) => {
	switch (action.type) {
      case 'ADD_TO_CART':
         let found = false;
         let newState = state.map(item=>{
            if(action.payload._id === item.id && action.payload.size === item.size){
               found = true;
               item.qty++;
            }
            return item;
         });
         if(found) return newState;

         let newCartItem = JSON.parse(JSON.stringify(action.payload));

		   localStorage.setItem('cart', JSON.stringify([...state, newCartItem]));

			return [...state, newCartItem];
			
      case "REMOVE_FROM_CART":
			const removeItem = state.filter(item=>{
            if(item._id === action.payload._id && item.size === action.payload.size){
               return false
            }else{
               return true
            }
         });
         // map it to local storage
			localStorage.setItem('cart', JSON.stringify(removeItem));
         return removeItem;
         
         case "CHANGE_QTY":
         const updated = state.map(item=>{
            if(item._id === action.payload.id){
               item.qty = action.payload.value;
               return item
            }
            return item;
         });
         // map it to local storage
			localStorage.setItem('cart', JSON.stringify(updated));
         return updated;
      
         
		case 'ORDER_MADE':
			console.log(action.payload);
			localStorage.removeItem('cart');
         return [];
         
		default:
			return state;
	}
};

export default cartReducer;