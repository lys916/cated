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

import HeaderBar from './HeaderBar';

class Address extends React.Component {
  state = { 
   qty: 1
  };

  handleChange = name => event => {
   this.setState({
     [name]: event.target.value,
   });
 };

  render(){
   const { classes, cart } = this.props;
    console.log('cart', cart);
    let total = null; 
    cart.forEach(item=>{
       total += item.price[item.size]
    });
  return (
   <div className={classes.root}>
      Enter delivery address
      <Card className={classes.card} >
         <CardContent>
         <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Full Name*"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-name"
          label="Phone number*"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-name*"
          label="Delivery address"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-name*"
          label="Apt, suite, etc (optional)"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
   

      </form>
         </CardContent>
      </Card>

      {/* total */}
      <Card className={classes.card} >
         <CardActionArea>
            <CardContent>
            <div className={classes.subTotal}>
               <div>Subtotal (2)</div><div>${total}</div>
            </div>
            <div className={classes.delivery}>
               <div>Delivery</div><div>Free</div>
            </div>
            <div className={classes.total}>Total: <span className={classes.totalPrice}>${total}</span></div>
               <Button variant="contained" color="primary" className={classes.button} onClick={()=>{this.props.history.push('/payment')}}>
                  Continue
               </Button>
            </CardContent>
         </CardActionArea>
      </Card>

   </div>
  );
  }
  
}

const styles = theme => ({
  root: {
    padding: 10,
    paddingTop: 60
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
delivery: {
 display: 'flex',
 justifyContent: 'space-between',
 borderBottom: '1px solid #dedede',
 paddingBottom: 20,
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
card: {
   textAlign: 'left',
   width: '100%',
   marginTop: 20
 },
 button: {
  margin: theme.spacing.unit,
  borderRadius: 500,
  width: '85vw',
  background: '#008cff'
  },
});

Address.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart
	}
}

export default connect(mapStateToProps, {addToCart, removeFromCart})(withStyles(styles)(Address));
