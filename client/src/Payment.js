import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {addToCart} from './actions/itemAction';
import { connect } from 'react-redux';
import {grillItems as items} from './dummy-data';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { removeFromCart } from './actions/itemAction';
import TextField from '@material-ui/core/TextField';
import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';
import {Elements, StripeProvider} from 'react-stripe-elements';
import StripePayment from './StripePayment';
import DatePicker from 'react-date-picker';

import HeaderBar from './HeaderBar';

Date.prototype.addMinutes = function(minutes) {
	this.setMinutes(this.getMinutes() + minutes);
	return this;
};

const createOptions = () => {
	return {
	  style: {
		base: {
		  fontSize: '20px',
		  border: '1px solid gray',
		  background: '#424770',
		  color: '#424770',
		  letterSpacing: '0.025em',
		  fontFamily: 'Source Code Pro, monospace',
		  '::placeholder': {
			color: '#aab7c4'
		  }
		},
		border: '1px solid gray',
		invalid: {
		  color: '#9e2146',
		},
	  },
	};
  };

class Payment extends React.Component {
   state = {
		openCart: false,
		openCheckOut: false,
		openDetails: false, 
		delName: '',
		delAddress: '',
		delPhone: '',
		delTime: new Date().addMinutes(60),
		nameOnCard: '',
		detailError: '',
		checkOutError: '',
      cartError: '',
      date: new Date()
	}

  handleChange = name => event => {
   this.setState({
     [name]: event.target.value,
   });
 };

 componentDidMount() {
   console.log('comp mount');
   const path = this.props.history.location.pathname;
   
}

handleOpenCart = () => {
   this.setState({ openCart: true });
};

handleCloseCart = () => {
   this.handleCloseAll();
};

handleOpenDetails = () => {
   if(this.props.cart.length > 0){
      this.setState({ openDetails: true, openCart: false, cartError: '' });
   }else{
      this.setState({cartError: 'Your cart is empty'});
   }
   
};

handleCloseDetails = () => {
   this.setState({ openDetails: false, openCart: true, detailError: '' });
};

handleOpenCheckOut = () => {
   const {delName, delAddress, delPhone} = this.state;
   console.log(delName, delAddress, delPhone);
   if(delName !== '' || delAddress !== '' || delPhone !== ''){
      this.setState({ openCheckOut: true, openCart: false, openDetials: false, detailError: '' });
   }else{
      this.setState({detailError: 'All fields are required.'});
   }
   
};

handleCloseAll = ()=> {
   this.setState({openCart: false, openCheckOut: false, openDetails: false, cartError: ''});
}

handleCloseCheckOut = () => {
   this.setState({ openCart: true, openCheckOut: false });
};

handleChange = (key) => (event) => {
   console.log(event.target.value);
   this.setState({ [key]: event.target.value});
};

dateChange = (date) => {
   this.setState({date: date});
}

handleChange = (prop) => (event) => {
   this.setState({ [prop]: event.target.value, missingField: false });
};

  render(){
   const { classes, cart } = this.props;
   //  console.log('cart', cart);
   //  let total = null; 
   //  cart.forEach(item=>{
   //     total += item.price[item.size]
   //  });
  return (
   
   <div className={classes.root}>
      <div className={classes.title}>Delivery Information</div>
      <Card className={classes.card}>
         <label className={classes.label}>
            Full Name
         </label><br/>
         <input className={classes.input} value={this.state.nameOnCard}  onChange={this.handleChange('nameOnCard')}/>
         <br/><br/> 
         <label className={classes.label}>
            Phone Number
         </label><br/>
         <input className={classes.input} value={this.state.nameOnCard}  onChange={this.handleChange('nameOnCard')}/>
         <br/><br/>
         <label className={classes.label}>
            Address
         </label><br/>
         <input className={classes.input} value={this.state.nameOnCard}  onChange={this.handleChange('nameOnCard')}/>
         <br/><br/>

         <div className={classes.dateTime}>
            <div className={classes.date}>

            <label className={classes.label}>
            Date
            </label><br/>
            <input className={classes.input} value={this.state.nameOnCard}  onChange={this.handleChange('nameOnCard')}/>
            </div>

            <div className={classes.time}>
            <label className={classes.label}>
            Time
            </label><br/>
            <input className={classes.input} value={this.state.nameOnCard}  onChange={this.handleChange('nameOnCard')}/>
            </div>

         </div>
         <br/><br/> 
         <DatePicker
          onChange={this.changeDate}
          value={this.state.date}
        /><br/><br/>
      </Card>

      <div className={classes.title}>Payment</div>


      {/* Card information
      
      <Card className={classes.card} >
         <CardContent> */}
         <StripeProvider apiKey="pk_test_RwPXTOOT26zF8BncTe2MfAUO">
					<Elements>


            <StripePayment 
               submitOrder={this.submitOrder} 
               nameOnCard={this.state.nameOnCard} 
               handleChange={this.handleChange} 
               open={this.state.openCheckOut} 
               closeAll={this.handleCloseAll} 
               closeCheckOut={this.handleCloseCheckOut}
               name={this.state.delName} 
               address={this.state.delAddress} 
               phone={this.state.delPhone} 
               time={this.state.delTime} />

         </Elements>
				</StripeProvider>
   </div>
   
  );
  }
  
}

const styles = theme => ({
  root: {
    padding: '60px 10px'

  },
  card: {
   textAlign: 'left',
   // width: '100%',
   padding: 10,
   
 },
 title: {
    textAlign: 'left',
    margin: '20px 0px 7px 10px',
    fontSize: 20
 },
  delivery: {
   fontSize: 14,
   width: '100%',
   // border: '1px solid red'
  },
  input: {
   width: '98.8%',
   fontSize: 18,
   borderRadius: 6,
   border: '1px solid #ababab',
   paddingLeft: '3px',
   height: 42,
  },
  dateTime: {
     display: 'flex'
  },
  date: {

  },
  time: {},
  container: {
   display: 'flex',
   flexWrap: 'wrap',
 },
 textField: {
   marginLeft: theme.spacing.unit,
   marginRight: theme.spacing.unit,
 },
 dense: {
   marginTop: 16,
 },
 menu: {
   width: 200,
 },
 subTotal: {
   display: 'flex',
   justifyContent: 'space-between',
   paddingBottom: 10,
   fontSize: 17
},

total: {
 fontSize: 20,
 textAlign: 'center',
 marginTop: 20
},
totalPrice: {
   fontSize: 23,
   fontWeight: 'bold',
},

 button: {
  margin: theme.spacing.unit,
  borderRadius: 500,
  width: '85vw',
  background: '#008cff'
  },
});

Payment.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart
	}
}

export default connect(mapStateToProps, {addToCart, removeFromCart})(withStyles(styles)(Payment));

// export default connect(mapStateToProps, { addToCart, removeFromCart})(withStyles(styles)(injectStripe(Payment)));
