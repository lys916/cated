import { tranRef } from "../config/firebase";
import axios from 'axios';

export const createOrder = (order) => {
	return (dispatch) => {
		dispatch({
			type: 'CREATING_CUSTOM_FOOD'
		});
		return axios.post(`/order`, order).then(res => {
			dispatch({
				type: 'ORDER_MADE',
				payload: res.data
			});
			return res.data
		});
	}
}