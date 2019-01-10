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
    weight: 1,
    activeMenu: 'All'
  };

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

  addToCart = ()=>{
    let item = items[this.state.expanded];
    item.lb = this.state.weight;
    item.totalPrice = Number.parseFloat((item.price * item.lb)).toFixed(2);
    this.props.addToCart(item)
    this.setState({expanded: null, selectedSize: null});
  }

  toggleActive = (menu)=>{
		this.setState({activeMenu: menu});
  }
  
  increaseWeight = ()=>{
    this.setState({weight: this.state.weight + 1});
  }
  decreaseWeight = ()=>{
    if(this.state.weight > 1){
      this.setState({weight: this.state.weight - 1});
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
      <CardActionArea onClick={()=>{this.handleExpandClick(index)}}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="160"
          image={item.image}
          title="Contemplative Reptile"
          
        />

        <CardContent>
          <Typography gutterBottom variant="h6">
            {item.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
           {item.desc}
          </Typography>
        </CardContent>

          <IconButton>
            <ExpandMoreIcon />
          </IconButton>

      </CardActionArea>


      <Collapse in={this.state.expanded === index ? true : false} timeout="auto" unmountOnExit>
          <CardContent className={classes.selections}>
            <div className={classes.select}>Select Weight</div>
            <div>${item.price} per lb</div>
            <div className={classes.weight}>
              <div onClick={this.decreaseWeight} className={classes.minus}>-</div>
              <input className={classes.input} value={this.state.weight} />
              <div onClick={this.increaseWeight} className={classes.minus}>+</div>
            </div>
            <Button size="medium" className={classes.addCart} onClick={this.addToCart}>
          add to cart
        </Button>

          </CardContent>
        </Collapse>

    </Card>
      )
      
    })}
    
    </div>
  );
  }
  
}

const styles = {
  root: {
    padding: 10
  },
  card: {
    textAlign: 'left',
    width: '100%',
    marginTop: 20
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover'
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
    width: 200,
    borderRadius: 5,
    border: '1px solid green',
    color: 'green',
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
  weight: {
    display: 'flex',
    padding: 5,
    justifyContent: 'center'
  },
  input: {
    width: 50
  },
  minus: {
    border: '1px solid #dedede',
    padding: 5,
    width: 20
  }

};

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
