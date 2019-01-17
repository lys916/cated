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

   placeOrder = async (total)=>{
      console.log('stripe', this.props.stripe);
      let { token } = await this.props.stripe.createToken();
       // console.log('RESSSS', res);
       console.log('stripe token', token);
    
   // build order object to send to server
    const order = {
       token: token.id,
       guestInfo: {
          name: this.props.name,
          address: this.props.address,
          phone: this.props.phone,
       },
       orderInfor: {
          items: this.props.cart,
          deliveryDate: this.props.date,
          deliveryTime: this.props.time,
          total
       }
    }
    if(this.props.user){
       order.user = this.props.user._id
    }
    // send order to server to charge
    console.log('Order waiting...', order);return;
    const charged = await this.props.createOrder(order);
    console.log('Order charged!', charged);
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
						   onClick={()=>{this.placeOrder(total)}}>
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
