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

class GrillingList extends React.Component {
  state = { 
    expanded: null,
    weight: 0,
    activeMenu: 'All',
    weightError: false,
    selectedItem: null
  };

  componentWillMount() {
   window.scrollTo(0, 0);
 }

  handleExpandClick = (index) => {
    if(this.state.expanded === index){
      this.setState({expanded: null, selectedSize: null});
    }else{
      this.setState({ expanded: index, selectedSize: null }, ()=>{
        console.log(this.state.expanded);
      });
    }
    
  };

  toggleSelectSize = (size)=>{
    if(size === this.state.selectedSize){
      this.setState({selectedSize: null});
    }else{
    this.setState({selectedSize: size}, ()=>{
      console.log(this.state.selectedSize);
    });
  }
  }

   addToCart = (item, index)=>{
      
      if(this.state.weight < 1){
         this.setState({weightError: true, selectedItem: index});
      }else{
         // if user select weight from different item
         if(this.selectedItem != index){
            this.setState({weightError: true, selectedItem: index, weight: 0});
         }
         item.lb = this.state.weight;
         item.totalPrice = Number(Number.parseFloat((item.price * item.lb)).toFixed(2));
         this.props.addToCart(item)
         this.setState({weight: 0, selectedItem: null});
      }
    
  }

  toggleActive = (menu)=>{
		this.setState({activeMenu: menu});
  }
  
  increaseWeight = (index)=>{
     if(this.state.selectedItem === index){
      this.setState({weight: this.state.weight + 1, selectedItem: index, weightError: false});
     }else{
        this.setState({weight: 1, selectedItem: index, weightError: false});
     }
    
  }
  decreaseWeight = (index)=>{
    if(this.state.weight > 0 && this.state.selectedItem === index){
      this.setState({weight: this.state.weight - 1, selectedItem: index});
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
      
        {/* <CardMedia
          component="img"
          alt="image"
          className={classes.media}
          image={`/images/${item.image}`}
          title="Contemplative Reptile"
          
        /> */}

        <div style={{padding: '15px 15px 0px 15px'}}>
            <img className={classes.image} src={`/images/${item.image}`} />
         </div>

        <CardContent>
          <Typography gutterBottom variant="h6">
            {item.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
           {item.desc}
          </Typography>
        </CardContent>

        <CardContent className={classes.selections}>
            <div className={classes.select}>Select Weight</div>
            <div>${item.price} per lb</div>

            {this.state.weightError && this.state.selectedItem === index ? <div style={{color: 'red'}}>Please select a weight</div> : null}

            <div className={classes.weight}>
               {/* <div onClick={()=>{this.decreaseWeight(index)}} className={classes.minus}>-</div> */}
               <Button variant="outlined" size="medium" 
                  color="primary" className={classes.margin} 
                  onClick={()=>{this.decreaseWeight(index)}}
               >
                  -
               </Button>

               {/* show 0 lb if no item is selected */}
               {this.state.selectedItem === index ? <div className={classes.weightPrice}><span className={classes.weightNumber}>{this.state.weight}</span> <span className={classes.weightLb}>Lb / ${Number.parseFloat((item.price * this.state.weight)).toFixed(2)}</span></div> 
                  : 
               <div className={classes.weightPrice}><span className={classes.weightNumber}>0</span> Lb / 0$</div>}

               <Button variant="outlined" size="medium" 
                  color="primary" className={classes.margin} 
                  onClick={()=>{this.increaseWeight(index)}}
               >
                  +
               </Button>
            </div>

            <Button variant="contained" color="primary"  size="medium" className={classes.addCart}    onClick={()=>{this.addToCart(item, index)}}>
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

const styles = theme=>({
   root: {
      padding: '100px 10px 50px 10px'
   },
   margin: {
      margin: theme.spacing.unit,
      minHeight: 0,
      minWidth: 0,
      width: 50,
      padding: '0px 0px 2px 0px',
      fontSize: 29,
    fontFamily: "'Quattrocento Sans', sans-serif"
    },
   card: {
      textAlign: 'left',
      width: '100%',
      marginTop: 40
   },
//   media: {
//     // ⚠️ object-fit is not supported by IE11.
//     objectFit: 'cover'
//   },
image: {
   width: '100%',
   borderRadius: 4,
   border: '1px solid #dedede'
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
  weight: {
   display: 'flex',
   padding: 5,
   justifyContent: 'space-between',
   width: 260,
   margin: '10px auto'
 },
  weightNumber: {
     fontSize: 23,
     fontWeigth: 'bold'
  },
  weightLb: {
     paddingTop: 6
  },
  weightPrice: {
     paddingTop: 16
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
  
  input: {
    width: 50
  },
  minus: {
    border: '1px solid #95a6e5',
    width: 20,
    fontSize: 30,
    padding: '2px 12px 5px 12px',
    borderRadius: 4
  },
});

GrillingList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart
	}
}

export default connect(mapStateToProps, {addToCart})(withStyles(styles)(GrillingList));
