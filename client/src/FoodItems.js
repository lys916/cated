import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import classnames from 'classnames';
import {addToCart} from './actions/itemAction';
import { connect } from 'react-redux';



 const items = [
   {
     image: "https://i.ytimg.com/vi/FLKBCXR5928/maxresdefault.jpg",
     name: 'Chicken Feet Salad',
     desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
     tags: 'Chicken Feet Salad',
     price: {
       small: 19,
       medium: 29,
       large: 39
     },
     id: 1
   },
   {
    image: "https://imageresizer.static9.net.au/_53VbhuVuO4DQzCwd5maxqgJXkQ=/636x358/smart/http%3A%2F%2Fprod.static9.net.au%2F_%2Fmedia%2FImages%2FKitchen%2F2015%2F09%2F02%2F10%2F48%2Fmlabeeflarb-recipe.jpg",
    name: 'Beef Larb',
    desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
    tags: 'Beef Salad Larb Laab',
    price: {
      small: 19,
      medium: 29,
      large: 39
    },
    id: 2
  },
  {
    image: "https://s3.amazonaws.com/foodfornet/wp-content/uploads/2017/08/Asian-Vermicelli-Stir-Fry-Final-1.jpg",
    name: 'Stir-Fry Vermicelli Noodle',
    desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
    tags: 'Vermicelli Noodle Stir',
    price: {
      small: 19,
      medium: 29,
      large: 39
    },
    id: 3
  },
  {
    image: "https://s3-media2.fl.yelpcdn.com/bphoto/-MWhIFobM8ewX_SnhBA22A/o.jpg",
    name: 'Garlic Wings',
    desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
    price: {
      small: 19,
      medium: 29,
      large: 39
    },
    id: 4
  },
  {
    image: "https://www.seriouseats.com/recipes/images/2015/08/20150730-anova-sous-vide-rib-guide-food-lab68-j-kenji-lopez-alt.jpg",
    name: 'BBQ Pork Ribs',
    desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
    price: {
      small: 19,
      medium: 29,
      large: 39
    },
    id: 5
  },
  {
    image: "https://i.pinimg.com/474x/b5/fb/1a/b5fb1ad8b8c57e80c8130d6e86d12cb1--mix-salad-noodle-salads.jpg",
    name: 'Mien Salad',
    desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
    price: {
      small: 19,
      medium: 29,
      large: 39
    },
    id: 6
  }
  

 ]


class FoodItems extends React.Component {
  state = { 
    expanded: null,
    selectedSize: null,
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
    item.size = this.state.selectedSize;
    this.props.addToCart(item)
    this.setState({expanded: null, selectedSize: null});
  }

  toggleActive = (menu)=>{
		this.setState({activeMenu: menu});
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

    {/* sub menus */}
    <div className={classes.subMenus}>
				<div className={this.state.activeMenu === 'All' ? classes.activeMenu : classes.menu} onClick={()=>{this.toggleActive('All')}}>All</div>
				<div className={this.state.activeMenu === 'Chicken' ? classes.activeMenu : classes.menu} onClick={()=>{this.toggleActive('Chicken')}}>Chicken</div>
				<div className={this.state.activeMenu === 'Beef' ? classes.activeMenu : classes.menu} onClick={()=>{this.toggleActive('Beef')}}>Beef</div>
				<div className={this.state.activeMenu === 'Pork' ? classes.activeMenu : classes.menu} onClick={()=>{this.toggleActive('Pork')}}>Pork</div>
				<div className={this.state.activeMenu === 'Seafood' ? classes.activeMenu : classes.menu} onClick={()=>{this.toggleActive('Seafood')}}>Seafood</div>

				<div className={this.state.activeMenu === 'Noodle' ? classes.activeMenu : classes.menu} onClick={()=>{this.toggleActive('Noodle')}}>Noodles</div>

				<div className={this.state.activeMenu === 'Salad' ? classes.activeMenu : classes.menu} onClick={()=>{this.toggleActive('Salad')}}>Salad</div>
				<div className={this.state.activeMenu === 'Appetizer' ? classes.activeMenu : classes.menu} onClick={()=>{this.toggleActive('Appetizer')}}>Appetizer</div>
				<div className={this.state.activeMenu === 'Others' ? classes.activeMenu : classes.menu} onClick={()=>{this.toggleActive('Others')}}>Others</div>
			</div>
    {menuItems.map((item, index)=>{
      return(
        <Card className={classes.card} >
      <CardActionArea onClick={()=>{this.handleExpandClick(index)}}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
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
            <div className={classes.select}>Select size</div>

            <div className={classes.sizes}>

              <div className={classes.size}>
              <div className={classes.price}>$15</div>

              <button 
                className={this.state.selectedSize === 'small' ? classes.activeButton : classes.button}
                onClick={()=>{this.toggleSelectSize('small')}}>
                Small
              </button>
              
              </div>

              <div className={classes.size}>
              <div className={classes.price}>$25</div>
              <button className={this.state.selectedSize === 'medium' ? classes.activeButton : classes.button}
                onClick={()=>{this.toggleSelectSize('medium')}}>
                Medium
              </button>
              
              </div>

              <div className={classes.size}>
              <div className={classes.price}>$35</div>
              <button variant="outlined"  color="primary" className={this.state.selectedSize === 'large' ? classes.activeButton : classes.button}
                onClick={()=>{this.toggleSelectSize('large')}}>
                Large
              </button>
              
              </div>
              

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
    textAlign: 'center'
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
    width: 260,
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
	}
};

FoodItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart
	}
}

export default connect(mapStateToProps, {addToCart})(withStyles(styles)(FoodItems));
