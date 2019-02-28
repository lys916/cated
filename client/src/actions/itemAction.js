export const addToCart = (item) => {
	return ({
      type: 'ADD_TO_CART',
      payload: item
   })
}
//

export const removeFromCart = (item) => {
	return ({
      type: 'REMOVE_FROM_CART',
      payload: item
   })
}

export const changeQty = (data) => {
	return ({
      type: 'CHANGE_QTY',
      payload: data
   })
}