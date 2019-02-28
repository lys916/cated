import { tranRef } from "../config/firebase";
import axios from 'axios';

export const createOrder = (order) => {
	return (dispatch) => {
		dispatch({
			type: 'ORDERING'
		});
		return axios.post(`/order`, order).then(res => {
			if(res.data.chargeError){
				dispatch({
					type: 'ORDER_ERROR',
					payload: res.data
				});
				return res.data
			}else{
				dispatch({
					type: 'ORDER_MADE',
					payload: res.data
				});
				return res.data
			}
			
		});
	}
}