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
import {drinkItems as items} from './dummy-data';

class DrinkList2 extends React.Component {
  state = { 
    expanded: null,
    qty: 1,
    activeMenu: 'All',
    qtyError: false,
    selectedItem: null
  };

  componentWillMount() {
   window.scrollTo(0, 0);
 }



  toggleSelectSize = (size)=>{
    if(size === this.state.selectedSize){
      this.setState({selectedSize: null});
    }else{
    this.setState({selectedSize: size}, ()=>{
      console.log(this.state.selectedSize);
    });
  }
  }

   addToCart = (item)=>{
      item.qty = this.state.qty;
      this.props.addToCart(item)


      // if(this.state.qty >){
      //    this.setState({qtyError: true, selectedItem: index});
      // }else{
      //    // if user select weight from different item
      //    if(this.selectedItem != index){
      //       this.setState({qtyError: true, selectedItem: index, qty: 1});
      //    }
      //    item.totalPrice = Number(Number.parseFloat((item.price * item.lb)).toFixed(2));
      //    this.props.addToCart(item)
      //    this.setState({qty: 1, selectedItem: null});
      // }
    
  }

  toggleActive = (menu)=>{
		this.setState({activeMenu: menu});
  }
  
  increaseQty = (index)=>{
     if(this.state.selectedItem === index){
      this.setState({qty: this.state.qty + 1, selectedItem: index, qtyError: false});
     }else{
        this.setState({qty: 2, selectedItem: index, qtyError: false});
     }
    
  }
  decreaseQty = (index)=>{
    if(this.state.qty > 1 && this.state.selectedItem === index){
      this.setState({qty: this.state.qty - 1, selectedItem: index});
    }
  }

  render(){
    const { classes, cart } = this.props;
    let menuItems;
    if(this.state.activeMenu === 'All'){
      menuItems = items;
    }else{
      menuItems = items.filter((item)=>{
        return item.name.includes(this.state.activeMenu);
      });
    }
  return (
    <div className={classes.root}>
    {menuItems.map((item, index)=>{
      return(
        <Card className={classes.card} >
      
        <CardMedia
          component="img"
          alt={item.name}
          className={classes.media}
          image={`/images/${item.image}`}
          title={item.name}
          
        />

        <CardContent>
          <div className={classes.itemName}>{item.name}</div>
          <div className={classes.itemDesc}>{item.desc}</div>
          <div className={classes.itemPrice}>${item.price}</div>
        </CardContent>

        <CardContent className={classes.selections}>
            <div className={classes.select}>Select Quantity</div>
            

            {/* {this.state.weightError && this.state.selectedItem === index ? <div style={{color: 'red'}}>Please select a weight</div> : null} */}

            <div className={classes.qty}>
               {/* decrease qty */}
              <div onClick={()=>{this.decreaseQty(index)}} className={classes.minus}>-</div>
               {/* selected qty */}
               {this.state.selectedItem === index ? 
                  <div className={classes.qtyPrice}>
                     <span>qty: </span>
                     <span className={classes.qtyNumber}>
                        {this.state.qty} 
                     </span>
                     <span>
                     <span> / </span> ${Number(item.price * this.state.qty)}
                     </span>
                  </div> 
                  : 
               <div className={classes.qtyPrice}>
                  <span>qty: </span> 
                  <span className={classes.qtyNumber}>1</span> 
                  <span>
                  <span> / </span> ${item.price}</span>
               </div>}

              <div onClick={()=>{this.increaseQty(index)}} className={classes.minus}>+</div>
            </div>

            <Button variant="contained" color="primary"  size="medium" className={classes.addCart}    onClick={()=>{this.addToCart(item)}}>
               add to cart
            </Button>

          </CardContent>

      



    </Card>
      )
      
    })}
    
    </div>
  );
  }
  
}

const styles = {
  root: {
   padding: '100px 10px 50px 10px'
  },
  card: {
    textAlign: 'left',
    width: '100%',
    marginTop: 40
  },
  media: {
     borderBottom: '1px solid #dedede'
    // ⚠️ object-fit is not supported by IE11.
   //  objectFit: 'cover'
  },
  itemName:{fontSize: 23},
  itemPrice:{
   fontSize: 22,
   fontWeigth: 'bold',
   paddingTop: 10
  },
  size: {
    margin: 5
  },
  sizes: {
    display: 'flex',
    justifyContent: 'center'
  },
  selections: {
    textAlign: 'center',
  },
  select: {
    fontSize: 13
  },
  price: {
    fontSize: 13
  },
  qtyNumber: {
     fontSize: 23,
     fontWeigth: 'bold'
  },
  qtyTotal: {
     paddingTop: 6,
     fontSize: 17
  },
  qtyPrice: {
     paddingBottom: 6,
     fontSize: 17
  },
  activeButton: {
    background: '#3651b5',
    border: '1px solid #3651b5',
    color: 'white',
    paddingTop: 7,
    paddingRight: 15,
    paddingBottom: 7,
    paddingLeft: 15,
    fontSize: 16,
    borderRadius: 4
  },
  button: {
    background: 'white',
    border: '1px solid #95a6e5',
    color: '#3651b5',
    paddingTop: 7,
    paddingRight: 15,
    paddingBottom: 7,
    paddingLeft: 15,
    fontSize: 16,
    borderRadius: 4
  },
  addCart: {
   width: 260,
   borderRadius: 100,
   marginTop: 10
  },
	subMenus: {
		display: 'flex',
		flexWrap: 'wrap',
    justifyContent: 'center'
	},
	menu: {
		background: '#bbbbbb',
		margin: '3px 3px 3px 3px',
		padding: 4,
		paddingRight: 10,
		paddingLeft: 10,
		borderRadius: 4,
		color: 'blue',
		fontSize: 14
	},
	activeMenu: {
		background: 'gray',
		margin: '3px 3px 3px 3px',
		padding: 4,
		paddingRight: 10,
		paddingLeft: 10,
		borderRadius: 4,
		color: 'white',
		fontSize: 14
  },
  qty: {
    display: 'flex',
    padding: 5,
    justifyContent: 'space-between',
    width: 220,
    margin: '10px auto'
  },
  input: {
    width: 50
  },
  minus: {
    border: '1px solid #95a6e5',
    width: 20,
    fontSize: 30,
    padding: '2px 10px',
    borderRadius: 4
  },
};

DrinkList2.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart
	}
}

export default connect(mapStateToProps, {addToCart})(withStyles(styles)(DrinkList2));
