import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createOrder } from './actions/orderAction'
import Card from '@material-ui/core/Card';
import TotalCard from './TotalCard';
import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';

// function rand() {
// 	return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
// 	const top = 50;
// 	const left = 50;

// 	return {
// 		top: `${top}%`,
// 		left: `${left}%`,
// 		transform: `translate(-${top}%, -${left}%)`,
// 	};
// }

// payment form config
const createOptions = () => {
	return {
	  style: {
		base: {
		  fontSize: '20px',
		  border: '1px solid red',
		  background: '#424770',
        color: '#424770',
		  letterSpacing: '0.025em',
		  fontFamily: 'Source Code Pro, monospace',
		  '::placeholder': {
			color: 'white'
		  }
		},
		border: '1px solid blue',
		invalid: {
		  color: '#9e2146',
      }
	  },
	};
};

class StripePayment extends React.Component {
	state = {
		paymentError: false
	};

	handleChange = (prop) => (event) => {
		this.setState({ [prop]: event.target.value, missingField: false });
	};

	paymentError = (boo)=>{
		this.setState({paymentError: boo});
	}

	render() {
      const { cart, classes, stripe, nameOnCard, handleChange, submitOrder } = this.props;
		let total = 0;
		cart.forEach(item=>{
			if(item.size){
				total += item.price[item.size];
			}else{
				total += item.price;
			}
		});
		total = parseFloat(total).toFixed(2);
		console.log('total', total);
		return (
			<div className={classes.root}>
            <Card className={classes.paymentData}>
							{this.state.paymentError ? <div className={classes.paymentError}>Unable to process your payment. Please make sure your card informations are correct.</div>:null}
               <label className={classes.label}>
                  Card Number*
               </label>
               <div className={classes.elementInput}>
                  <CardNumberElement 
               {...createOptions()}/>
               </div>

               <br/>

               <label className={classes.label}>
                  Expiration Date* (mm/yy)
               </label>
               <div className={classes.elementInput}>
                     <CardExpiryElement {...createOptions()}/>
               </div>
               <br/>

                     <label className={classes.label}>
                  CVC* (3 digits)
               </label>
               <div className={classes.elementInput}>
               <CardCVCElement {...createOptions()} />
               </div>
               <br/>

               {this.state.missingField ? <div>All fields required</div> : null}
            </Card>

            <TotalCard 
               stripe={stripe} 
               buttonName="Place Order" 
               path={this.props.path} 
               history={this.props.history}
               handleChange={this.props.handleChange}
               orderData={this.props.orderData}
							 checkFormData={this.props.checkFormData}
							 paymentError={this.paymentError}
            />

			</div>

		);
	}
}

StripePayment.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
	paymentData: {
      textAlign: 'left',
      padding: 10,
      position: 'relative'
	  },
	card: {
		width: '100%',
		margin: "5px auto",
		textAlign: 'left'
	},
	elementInput: {
		border: '1px solid #ababab',
      padding: '10px 5px',
      borderRadius: 6
   },
   // regularInput: {
   //    width: '97%',
   //    padding: '10px 5px',
   //    fontSize: 18,
   //    margin: '0px auto'
   // },
	label: {
      fontSize: 15,
      textAlign: 'left'
	},
	paymentError: {
		color: 'red',
		paddingBottom: 5
	}
	// save: {
	// 	width: '100%',
	// 	margin: '20px 0px 40px 0px'
	// },
	// item: {
	// 	display: 'flex',
	// 	padding: 5,
	// 	borderBottom: '1px solid #dedede'
	// },
	// unit: {
	// 	fontSize: 12
	// },
	// name: {
	// 	fontSize: 16,
	// 	color: '#111111',
	// },
	// size: {
	// 	fontSize: 14
	// },
	// info: {
	// 	paddingLeft: 10
	// },
	// total: {
	// 	display: 'flex', 
	// 	justifyContent: 'space-between', 
	// 	fontSize: 18,
	// 	margin: 5,
	// 	background: '#efefef',
	// 	padding: 10
	// }
});


const mapStateToProps = (state) => {
	return {
		cart: state.cart
	}
}

export default connect(mapStateToProps, { createOrder})(withStyles(styles)(injectStripe(StripePayment)));
