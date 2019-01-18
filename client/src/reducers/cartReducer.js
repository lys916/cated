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
         // if item already exists in the shopping cart, update the item
         let newState = state.map(item=>{
            if(action.payload.type === 'food' && action.payload._id === item._id && action.payload.size === item.size){
               found = true;
               item.qty++;
            }
            if(action.payload.type === 'drink' && action.payload._id === item._id){
               found = true;
               item.qty = item.qty + action.payload.qty;
            }
            if(action.payload.type === 'grill' && action.payload._id === item._id){
               found = true;
               item.lb = item.lb + action.payload.lb;
               item.totalPrice = item.price * item.lb;
            }
            return item;
         });

         
         // return updated item in shopping cart
         if(found){
            // map new state to local storage
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
         }

         // map new state to local storage
         let newItemStr = JSON.parse(JSON.stringify(action.payload));
         localStorage.setItem('cart', JSON.stringify([...state, newItemStr]));

         //return state + new item
			return [...state, action.payload];
			
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