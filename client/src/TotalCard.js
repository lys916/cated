import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createOrder } from './actions/orderAction';

class CheckoutCard extends React.Component {
   state = {};

	 handleCheckForm = (total) => {
		 const isComplete = this.props.checkFormData();

		 if(isComplete){
			 this.placeOrder(total);
		 }
	 }

   placeOrder = async (total)=>{
		 // check if form is complete at payment.js
		 
		 console.log('total', total);
		 console.log('totalcard props', this.props);
      console.log('stripe', this.props.stripe);
      let { token } = await this.props.stripe.createToken();
			if(!token){
				this.props.paymentError(true);
			}else{
				this.props.paymentError(false);
       // console.log('RESSSS', res);
       console.log('stripe token', token);
    
				// build order object to send to server
				const orderInfo = this.props.orderData;
				orderInfo.total = total;
				orderInfo.items = this.props.cart;
				const order = {
						orderInfo,
						token: token.id,
						total: total
				}

				if(this.props.user){
					order.user = this.props.user._id
				}
				// send order to server to charge
				console.log('Order waiting...', order);
				const charged = await this.props.createOrder(order);
				if(charged.chargeError){
					alert('Unable to charge your card');
				}
				if(charged._id){
					this.props.history.push('/order-completed');
					//  this.props.closeAll();
				}

      // let response = await fetch("/charge", {
      //   method: "POST",
      //   headers: {"Content-Type": "text/plain"},
      //   body: token.id
      // });
    
      // if (response.ok) console.log("Purchase Complete!")
			}
    
    
    }
  	render(){
      const { classes, cart, path } = this.props;
      let total = null; 

      //calculate and get the total for food items and drink items
      cart.forEach(item=>{
         if(item.type === 'grill'){
           total += (item.totalPrice * item.qty)
         }
         if(item.type === 'food'){
           total += (item.price[item.size] * item.qty)
         }
         if(item.type === 'drink'){
            total += (item.price * item.qty)
          }
      });
      total = Number(Number.parseFloat((total)).toFixed(2));
		return (
			<Card className={classes.card} >
				<CardContent className={classes.cardTotal}>
					<div className={classes.subTotal}>
						<div>Subtotal ({cart.length})</div><div>${total}</div>
					</div>
					<div className={classes.delivery}>
						<div>Delivery</div><div>Free</div>
					</div>
					<div className={classes.total}>
						Total: <span className={classes.totalPrice}>${total}</span>
					</div>
      

          {this.props.path === '/payment' ? 
                  <Button variant="contained" 
						   color="primary" 
						   className={classes.button} 
						   onClick={()=>{this.handleCheckForm(total)}}>
							{this.props.buttonName} ({cart.length})
					   </Button> : <Button variant="contained" 
						color="primary" 
						className={classes.button} 
						onClick={()=>{this.props.buttonClick({path: this.props.path, total})}}>
							{this.props.buttonName} ({cart.length})
					</Button>}
				</CardContent>
			</Card>
		);
  	}
  
}
// STYLES ***
const styles = theme => ({
  	root: {
   	 padding: 10,
    	paddingTop: 60
  	},
  	card: {
		textAlign: 'left',
		width: '100%',
		marginTop: 20,
 	},
 	cardTotal: {
    	color: '#333333',
    	fontSize: 16
 	},
  	subTotal: {
     	display: 'flex',
     	justifyContent: 'space-between',
     	paddingBottom: 10,
  	},
  	delivery: {
		display: 'flex',
		justifyContent: 'space-between',
		borderBottom: '1px solid #dedede',
		paddingBottom: 20,
  	},
  	total: {
		textAlign: 'center',
		marginTop: 20,
  	},
  	totalPrice: {
     	fontSize: 22,
     	fontWeight: 'bold',
  	},

 	button: {
   	margin: theme.spacing.unit,
   	borderRadius: 500,
   	width: '85vw'
	},
});

CheckoutCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart
	}
}

export default connect(mapStateToProps, {createOrder})(withStyles(styles)(CheckoutCard));
