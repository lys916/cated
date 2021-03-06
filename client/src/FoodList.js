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
import {foodItems as items} from './dummy-data';

class FoodList extends React.Component {
   state = {
      expanded: null,
      selectedSize: null,
      selectedItem: null,
      activeMenu: 'All',
      addedPopup: false,
      sizeError: false
   };

   componentWillMount() {
      window.scrollTo(0, 0);
    }

   handleExpandClick = (index) => {
      if (this.state.expanded === index) {
         this.setState({ expanded: null, selectedSize: null });
      } else {
         this.setState({ expanded: index, selectedSize: null }, () => {
            console.log(this.state.expanded);
         });
      }

   };

   toggleSelectSize = (size, index) => {
      this.setState({
         selectedItem: index,
         selectedSize: size,
         sizeError: false
      });
   }

   addToCart = (item, index) => {
      // if add to cart without selecting size
      if(this.state.selectedSize === null){
         this.setState({selectedItem: index, sizeError: true});
      }else{
         // if user select size from different item
         if(this.state.selectedItem != index){
            this.setState({selectedItem: index, sizeError: true, selectedSize: null});
         }else{
            item.size = this.state.selectedSize;
            this.props.addToCart(item)
            this.setState({
            selectedItem: null,
            selectedSize: null,
            addedPopup: true
         });
         setTimeout(()=>{
            this.setState({addedPopup: false});
         }, 2000);
         }  
      }
   }

   toggleActive = (menu) => {
      this.setState({ activeMenu: menu });
   }

   render() {
      const { classes, cart } = this.props;
      let menuItems;
      if (this.state.activeMenu === 'All') {
         menuItems = items;
      } else {
         menuItems = items.filter((item) => {
            return item.name.includes(this.state.activeMenu);
         });
      }
      return (
         <div className={classes.root}>

            {/* sub menus
            <div className={classes.subMenus}>
               <div className={this.state.activeMenu === 'All' ? classes.activeMenu : classes.menu} onClick={() => { this.toggleActive('All') }}>All</div>
               <div className={this.state.activeMenu === 'Chicken' ? classes.activeMenu : classes.menu} onClick={() => { this.toggleActive('Chicken') }}>Chicken</div>
               <div className={this.state.activeMenu === 'Beef' ? classes.activeMenu : classes.menu} onClick={() => { this.toggleActive('Beef') }}>Beef</div>
               <div className={this.state.activeMenu === 'Pork' ? classes.activeMenu : classes.menu} onClick={() => { this.toggleActive('Pork') }}>Pork</div>
               <div className={this.state.activeMenu === 'Seafood' ? classes.activeMenu : classes.menu} onClick={() => { this.toggleActive('Seafood') }}>Seafood</div>

               <div className={this.state.activeMenu === 'Noodle' ? classes.activeMenu : classes.menu} onClick={() => { this.toggleActive('Noodle') }}>Noodles</div>

               <div className={this.state.activeMenu === 'Salad' ? classes.activeMenu : classes.menu} onClick={() => { this.toggleActive('Salad') }}>Salad</div>
               <div className={this.state.activeMenu === 'Appetizer' ? classes.activeMenu : classes.menu} onClick={() => { this.toggleActive('Appetizer') }}>Appetizer</div>
               <div className={this.state.activeMenu === 'Others' ? classes.activeMenu : classes.menu} onClick={() => { this.toggleActive('Others') }}>Others</div>
            </div> */}

            {menuItems.map((item, index) => {
               return (
                  // Each Foot Item Card
                  <Card className={classes.card} key={index}>
                        {/* Item Image */}
                        {/* <CardMedia
                           component="img"
                           alt="Contemplative Reptile"
                           className={classes.media}
                           image={`/images/${item.image}`}
                           title="Contemplative Reptile"

                        /> */}
                        <div style={{padding: '15px 15px 0px 15px'}}>
                           <img className={classes.image} src={`/images/${item.image}`} />
                        </div>

                        {/* Item name and description */}
                        <CardContent>
                           <Typography gutterBottom variant="h6">
                              {item.name}
                           </Typography>
                           <Typography variant="body1" gutterBottom>
                              {item.desc}
                           </Typography>
                        </CardContent>

                        {/* Item size selection */}
                        <CardContent className={classes.selections}>
                           <div className={classes.select}>
                              Select size (tray)
                           </div>

                           {/* when a user doesn't select a tray size */}
                           {this.state.sizeError && this.state.selectedItem === index ? <div style={{color: 'red'}}>Please select a size</div> : null}

                           <div className={classes.sizes}>

                              <div className={classes.size}>
                                 <div className={classes.price}>$15</div>

                                 <button
                                    className={this.state.selectedSize === 'Small' && this.state.selectedItem === index ? classes.activeButton : classes.sizeButton}
                                    onClick={() => { this.toggleSelectSize('Small', index) }}>
                                    Small
                                 </button>

                              </div>

                              <div className={classes.size}>
                                 <div className={classes.price}>$25</div>
                                 <button className={this.state.selectedSize === 'Medium' && this.state.selectedItem === index ? classes.activeButton : classes.sizeButton}
                                    onClick={() => { this.toggleSelectSize('Medium', index) }}>
                                    Medium
                                 </button>

                              </div>

                              <div className={classes.size}>
                                 <div className={classes.price}>$35</div>
                                 <button variant="outlined" color="primary" className={this.state.selectedSize === 'Large' && this.state.selectedItem === index ? classes.activeButton : classes.sizeButton}
                                    onClick={() => { this.toggleSelectSize('Large', index) }}>
                                    Large
                                 </button>

                              </div>


                           </div>
                           {/* add to cart button */}
                           <Button variant="contained" color="primary"  size="medium" className={classes.addCart}    onClick={()=>{this.addToCart(item, index)}}>
                              add to cart
                           </Button>

                        </CardContent>
                  </Card>
               )

            })}
            <div className={`added-popup ${this.state.addedPopup ? 'show-addedpopup' : null}`} style={{color: 'white', paddingTop: 10}}>Item added!</div>
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
      // ⚠️ object-fit is not supported by IE11.
   },
   image: {
      width: '100%',
      borderRadius: 5,
      border: '1px solid #dedede'
   },
   size: {
      margin: 5
   },
   sizes: {
      display: 'flex',
      justifyContent: 'center',
      margin: '10px 0'
   },
   selections: {
      textAlign: 'center'
   },
   select: {
      fontSize: 14
   },
   price: {
      fontSize: 14
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
   sizeButton: {
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
};

FoodList.propTypes = {
   classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
   return {
      user: state.user,
      cart: state.cart
   }
}

export default connect(mapStateToProps, { addToCart })(withStyles(styles)(FoodList));
