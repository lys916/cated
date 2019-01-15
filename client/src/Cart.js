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
import TotalCard from './TotalCard';

import HeaderBar from './HeaderBar';

class Cart extends React.Component {
  state = { 
   qty: 1
  };

  handleChange = event => {
   this.setState({ [event.target.name]: event.target.value });
 };

 handleRemoveFromCart = (item)=>{
    console.log('Item to remove', item);
   this.props.removeFromCart(item);
 }

 
 redirect = (path)=>{
   this.props.history.push(`./${path}`);
}

  render(){
    const { classes, cart} = this.props;
  return (
    <div className={classes.root}>
      {cart.length > 0 ? <TotalCard path="payment" buttonName="Checkout" buttonClick={this.redirect}/> : null}
   
      {/* Cart Item List */}
      <Card className={classes.card} >

            <CardContent>
               {cart.length === 0 ? <div>Your cart is empty.</div> : null}

               {cart.map((item, index)=>{
                  return(
                     <div className={classes.eachItem}>
                        <div className={classes.imgDesc}>
                           <div className={classes.imgWrapper}>
                              <img className={classes.image} src={item.image}/>
                           </div>
                           <div>
                              <div className={classes.itemName}>{item.name}</div>
                              <div className={classes.itemSize}>Size: {item.size} tray</div>
                              <div className={classes.itemPrice}>${item.price[item.size]}</div>
                           </div>
                        </div>
                        <div className={classes.qtyRemove}>
                           {/* SELECT DROPDOWN */}
                           <div>
                           <FormControl className={classes.formControl}>
                              <InputLabel shrink htmlFor="age-label-placeholder">
                                 Qty:
                              </InputLabel>
                              <Select
                                 value={this.state.qty}
                                 onChange={this.handleChange}
                                 input={<Input name="qty" id="qty-label-placeholder" />}
                                 displayEmpty
                                 name="qty"
                                 className={classes.selectEmpty}
                              >
                                 <MenuItem value={1}>1</MenuItem>
                                 <MenuItem value={2}>2</MenuItem>
                                 <MenuItem value={3}>3</MenuItem>
                                 <MenuItem value={4}>4</MenuItem>
                                 <MenuItem value={5}>5</MenuItem>
                                 <MenuItem value={6}>6</MenuItem>
                                 <MenuItem value={7}>7</MenuItem>
                                 <MenuItem value={8}>8</MenuItem>
                                 <MenuItem value={9}>9</MenuItem>

                              </Select>
                           </FormControl>
                           </div>
                           <div className={classes.removeBtn} onClick={()=>{this.handleRemoveFromCart(item)}}>
                              Remove
                           </div>
                        </div>
                     </div>
                  )
                  
               })}
            </CardContent>
      </Card>
      {cart.length > 0 ? <TotalCard path="payment" buttonName="Checkout" buttonClick={this.redirect}/> : null}
      {/* <div className={backBtn}>Back to shopping</div> */}
    </div>
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
   eachItem: {
      borderBottom: '1px solid #dedede',
      paddingBottom: 20,
      margin: '20px auto',
      fontSize: 16.
   },
   // image and description
   imgDesc: {
      display: 'flex'
   },
   imgWrapper: {
      marginRight: 10
   },
   image: {
      width: '25vw'
   },
   // descrition
   itemName: {
      fontSize: 17,
      paddingBottom: 5
   },
   itemSize: {
      paddingBottom: 5
   },
   itemPrice: {
      fontSize: 17,
      fontWeight: 'bold',
      paddingBottom: 5
   },
   // qty and remove button
   qtyRemove: {
      display: 'flex',
      justifyContent: 'space-between',
      // border: '1px solid blue'
   },
   removeBtn: {
      // border: '1px solid red',
      paddingTop: 28,
      paddingBottom: 5,
      borderBottom: '1px solid gray'
   },
});

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart
	}
}

export default connect(mapStateToProps, {addToCart, removeFromCart})(withStyles(styles)(Cart));
