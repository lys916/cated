import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createOrder } from './actions/orderAction'
// import { addTran, fetchTrans } from './actions/tranAction';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import DatePicker from './DatePicker';
import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';
// import { Link } from 'react-router-dom';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

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
		open: false,
		missingField: false
	};

	componentDidMount(){
		// this.props.fetchTrans(this.props.user.email);
	}

	

	submitOrder = async (total)=>{
        let { token } = await this.props.stripe.createToken({name: "Lo Saephan"});
			// console.log('RESSSS', res);
			console.log('stripe token', token.id);
		
		const order = {
			token: token.id,
			deliveryDate: this.props.time,
			guestInfo: {
				name: this.props.name,
				address: this.props.address,
				phone: this.props.phone
			},
			items: this.props.cart,
			total
		}
		if(this.props.user){
			order.user = this.props.user._id
		}
		console.log('ORDER WAITING', order);
		const charged = await this.props.createOrder(order);
		console.log('compoeennt Charged', charged);
		if(charged._id){
			alert('Order Complete!');
			this.props.closeAll();
		}

        // let response = await fetch("/charge", {
        //   method: "POST",
        //   headers: {"Content-Type": "text/plain"},
        //   body: token.id
        // });
      
        // if (response.ok) console.log("Purchase Complete!")
		
		
      }

	
	handleChange = (prop) => (event) => {
		this.setState({ [prop]: event.target.value, missingField: false });
	};
	// handleSaveTran = ()=>{
	// 	const {title, desc, amount} = this.state
	// 	if(title !== '' && desc !== '' && amount !== ''){
	// 		this.setState({open: false}, ()=>{
	// 			this.props.addTran({
	// 				title: this.state.title,
	// 				desc: this.state.desc,
	// 				amount: this.state.amount,
	// 				email: this.props.user.email
	// 			});
	// 		});
	// 	}else{
	// 		this.setState({missingField: true});
	// 	}
		
	// }
	render() {
		const { cart, classes, nameOnCard, handleChange, submitOrder } = this.props;
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
				
						<label className={classes.label}>
							Card Number
						</label>
						<div className={classes.elementInput}>
							<CardNumberElement 
						{...createOptions()}/>
						</div>

						<br/>

						<label className={classes.label}>
							Expiration Date
						</label>
						<div className={classes.elementInput}>
                        <CardExpiryElement {...createOptions()}/>
						</div>
						<br/>

                        <label className={classes.label}>
							CVC
						</label>
						<div className={classes.elementInput}>
						<CardCVCElement {...createOptions()} />
						</div>
						<br/>

						{/* <Button variant="contained" color="primary" className={classes.save} onClick={()=>{this.submitOrder(total)}}>
							Place Order
						</Button> */}
						{this.state.missingField ? <div>All fields required</div> : null}
					</Card>

			</div>

		);
	}
}


// initialize prop classes
StripePayment.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
	// modal: {
	// 	position: 'relative',
	// 	width: '90%',
	// 	height: '90%',
	// 	margin: '10px auto',
	// 	padding: '30px 10px 0px 10px',
	// 	//   width: theme.spacing.unit * 50,
	// 	backgroundColor: theme.palette.background.paper,
	// 	boxShadow: theme.shadows[5],
	// 	//   padding: theme.spacing.unit * 4,
	// 	overflow: 'auto',
	// 	background: 'gray'
	// },
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
	clearBtn: {
		position: 'absolute',
		top: 3,
		right: 3,
		background: '#999999',
		color: 'white',
		borderRadius: '100%'
	},
	elementInput: {
		border: '1px solid #ababab',
      padding: '10px 5px',
      borderRadius: 6
      // fontSize: 21,
      // margin: 10
   },
   regularInput: {
      width: '97%',
      padding: '10px 5px',
      fontSize: 18,
      margin: '0px auto'
   },
	label: {
      fontSize: 15,
      textAlign: 'left'
	},
	save: {
		width: '100%',
		margin: '20px 0px 40px 0px'
	},
	item: {
		display: 'flex',
		padding: 5,
		borderBottom: '1px solid #dedede'
	},
	unit: {
		fontSize: 12
	},
	name: {
		fontSize: 16,
		color: '#111111',
	},
	size: {
		fontSize: 14
	},
	info: {
		paddingLeft: 10
	},
	total: {
		display: 'flex', 
		justifyContent: 'space-between', 
		fontSize: 18,
		margin: 5,
		background: '#efefef',
		padding: 10
	}
});

// const styles = {
// 	root: {
// 		paddingTop: 70,
// 		paddingBottom: 100,
// 	},
// 	card: {
// 		marginRight: "100px",
// 		width: '100%',
// 		textAlign: 'left'
// 	},
// 	button: {
// 		position: 'fixed',
// 		bottom: 80,
// 		right: 10
// 	}
// };

const mapStateToProps = (state) => {
	return {
		cart: state.cart
	}
}
// export default injectStripe(CheckOut);
// export default connect(mapStateToProps, {addTran, fetchTrans})(withStyles(styles)(CheckOut));
export default connect(mapStateToProps, { createOrder})(withStyles(styles)(injectStripe(StripePayment)));
