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
import { addToCart } from './actions/itemAction';
import { connect } from 'react-redux';
import { grillItems as items } from './dummy-data';
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
import { CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripePayment from './StripePayment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { TimePicker } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import { DateTimePicker } from 'material-ui-pickers';
import DatePickerUI from './DatePicker';
import TotalCard from './TotalCard';
//


import HeaderBar from './HeaderBar';

const { REACT_APP_STRIPE_API_KEY, REACT_APP_STRIPE_API_KEY_TEST } = process.env;

console.log(REACT_APP_STRIPE_API_KEY);
console.log(REACT_APP_STRIPE_API_KEY_TEST);

Date.prototype.addMinutes = function (minutes) {
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
    delName: '',
    delAddress: '',
    delPhone: '',
    delHour: '',
    delMinute: '',
    delAmpm: '',
    nameOnCard: '',
    selectedDate: null,
    delNameError: false,
    delPhoneError: false,
    delAddressError: false,
    delDateError: false,
    delHourError: false,
    delMinuteError: false,
    delAmpmError: false
  }

  checkFormData = () => {
    const { delName, delAddress, delPhone, selectedDate, delHour, delMinute, delAmpm } = this.state;
    if (delName === '') {
      this.setState({ delNameError: true });
    }
    if (delAddress === '') {
      this.setState({ delAddressError: true });
    }
    if (delPhone === '') {
      this.setState({ delPhoneError: true });
    }
    if (!selectedDate) {
      this.setState({ delDateError: true });
    }
    if (delHour === '') {
      this.setState({ delHourError: true });
    }
    if (delMinute === '') {
      this.setState({ delMinuteError: true });
    }
    if (delAmpm === '') {
      this.setState({ delAmpmError: true });
    }
    if (delName !== '' && delAddress !== '' && delPhone !== '' && selectedDate && delHour !== '' && delMinute !== '' && delAmpm !== '') {
      return true;
    } else {
      return false;
    }

  }

  handleChange = event => {
    console.log([event.target.name + 'Error']);
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name + 'Error']: false
    });
  };

  componentWillMount() {
    window.scrollTo(0, 0);
  }

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
    if (this.props.cart.length > 0) {
      this.setState({ openDetails: true, openCart: false, cartError: '' });
    } else {
      this.setState({ cartError: 'Your cart is empty' });
    }

  };

  handleCloseDetails = () => {
    this.setState({ openDetails: false, openCart: true, detailError: '' });
  };

  handleOpenCheckOut = () => {
    const { delName, delAddress, delPhone } = this.state;
    console.log(delName, delAddress, delPhone);
    if (delName !== '' || delAddress !== '' || delPhone !== '') {
      this.setState({ openCheckOut: true, openCart: false, openDetials: false, detailError: '' });
    } else {
      this.setState({ detailError: 'All fields are required.' });
    }

  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date, delDateError: false });
  }

  handleCloseAll = () => {
    this.setState({ openCart: false, openCheckOut: false, openDetails: false, cartError: '' });
  }

  handleCloseCheckOut = () => {
    this.setState({ openCart: true, openCheckOut: false });
  };

  // handleChange = (key) => (event) => {
  //    console.log(event.target.value);
  //    this.setState({ [key]: event.target.value});
  // };


  // handleChange = (prop) => (event) => {
  //    this.setState({ [prop]: event.target.value, missingField: false });
  // };


  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;
    const path = this.props.history.location.pathname;
    console.log('render', this.state);
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
            Full Name*
               </label>

          {this.state.delNameError ? <span className={classes.error}> &nbsp; Full name is required.</span> : null}

          <br />
          <input className={classes.input} name="delName" value={this.state.delName} onChange={this.handleChange} /><br /><br />

          <label className={classes.label}>
            Phone Number*
               </label>
          {this.state.delPhoneError ? <span className={classes.error}> &nbsp; Phone number name is required.</span> : null}
          <br />
          <input className={classes.input} name="delPhone" value={this.state.delPhone} onChange={this.handleChange} /><br /><br />

          <label className={classes.label}>
            Address*
               </label>
          {this.state.delAddressError ? <span className={classes.error}> &nbsp; Full name is required.</span> : null}
          <br />
          <input className={classes.input} name="delAddress" value={this.state.delAddress} onChange={this.handleChange} /><br /><br />

          {/* Date and time */}
          {/* Only works if we set up pure component? and import it */}

          <DatePickerUI handleDateChange={this.handleDateChange} dateError={this.state.delDateError} date={this.state.selectedDate} /><br />


          {this.state.delHourError ? <div className={classes.error}> &nbsp; Hour is required.</div> : null}
          {this.state.delMinuteError ? <div className={classes.error}> &nbsp; Minute is required.</div> : null}
          {this.state.delAmpmError ? <div className={classes.error}> &nbsp; AmPm is required.</div> : null}
          <div className={classes.timeWrapper}>
            <div className={classes.time}>
              <label className={classes.label}>
                Time*
                  <br /><span style={{ fontSize: 12, paddingLeft: 3 }}>Hour</span>
              </label><br />
              <select className={classes.input} placeholder="hour" name="delHour" onChange={this.handleChange}>
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div className={classes.time}>
              <label className={classes.label}>
                <br /><span style={{ fontSize: 12, paddingLeft: 3 }}>Minute</span>
              </label><br />
              <select className={classes.input} name="delMinute" onChange={this.handleChange}>
                <option value=""></option>
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
            </div>
            <div className={classes.time}>
              <label className={classes.label}>
                <br /><span style={{ fontSize: 12, paddingLeft: 3 }}>Am/pm</span>
              </label><br />
              <select className={classes.input} name="delAmpm" onChange={this.handleChange}>
                <option value=""></option>
                {this.state.delHour === '9' || this.state.delHour === '10' || this.state.delHour === '11' ? <option value="AM">AM</option> : null}
                {this.state.delHour === '12' ? <option value="PM">PM</option> : null}
                {Number(this.state.delHour) >= 1 && Number(this.state.delHour) <= 8 ? <option value="PM">PM</option> : null}
                {/* <option value="am">AM</option>
                        <option value="pm">PM</option> */}
              </select>
            </div>
          </div>
        </Card>

        <div className={classes.title}>Payment</div>

        <StripeProvider apiKey={REACT_APP_STRIPE_API_KEY_TEST}>
          <Elements>
            <StripePayment
              submitOrder={this.submitOrder}
              nameOnCard={this.state.nameOnCard}
              handleChange={this.handleChange}
              open={this.state.openCheckOut}
              closeAll={this.handleCloseAll}
              closeCheckOut={this.handleCloseCheckOut}
              path={path}
              history={this.props.history}
              orderData={this.state}
              checkFormData={this.checkFormData}
            />
          </Elements>
        </StripeProvider>
        <div className={classes.backWrapper}>
          <Button className={classes.backShopping} variant="contained" onClick={() => { this.props.history.push('/') }}>
            Back to shopping
               </Button>
        </div>
      </div> // root
    );
  }
}

const styles = theme => ({
  root: {
    padding: '60px 10px 0px 10px'

  },
  card: {
    textAlign: 'left',
    // width: '100%',
    padding: 10,

  },
  backWrapper: {
    textAlign: 'left',
    padding: '20px 0px 30px 0px'
  },
  backShopping: {
    fontSize: 12,
    borderRadius: 100,
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
    fontSize: 17,
    borderRadius: 6,
    border: '1px solid #ababab',
    paddingLeft: '3px',
    height: 42,
    background: 'white'
  },
  timeWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',

    overFlow: 'none'

  },
  time: {
    width: '30%'
  },
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
  grid: {
    width: '60%',
  },
  error: {
    color: 'red',
    fontSize: 13
  }
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

export default connect(mapStateToProps, { addToCart, removeFromCart })(withStyles(styles)(Payment));

// export default connect(mapStateToProps, { addToCart, removeFromCart})(withStyles(styles)(injectStripe(Payment)));
