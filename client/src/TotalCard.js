import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

class CheckoutCard extends React.Component {
	state = {};
  	render(){
      const { classes, cart } = this.props;
      console.log(cart);
      let total = null; 
      cart.forEach(item=>{
         if(item.totalPrice){
           total += item.totalPrice
           console.log('name', item.name);
           console.log('price', item.totalPrice);
           console.log('total', total);
         }
         if(item.size){
           total += item.price[item.size]
           console.log('name', item.name);
           console.log('price', item.price);
           console.log('total', total);
         }
      });
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
					<Button variant="contained" 
						color="primary" 
						className={classes.button} 
						onClick={()=>{this.props.buttonClick(this.props.path)}}>
							{this.props.buttonName} ({cart.length})
					</Button>
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
   	width: '85vw',
  		background: '#008cff'
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

export default connect(mapStateToProps, {})(withStyles(styles)(CheckoutCard));
