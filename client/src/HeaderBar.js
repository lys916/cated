import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerMenu from './DrawerMenu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import ModalCart from './ModalCart';
import { signOut, signUp} from './actions/userAction'

const cartItems = [
	{
		image: "https://i.ytimg.com/vi/FLKBCXR5928/maxresdefault.jpg",
		name: 'Chicken Feet Salad',
		desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors'
	  },
	  {
	   image: "https://imageresizer.static9.net.au/_53VbhuVuO4DQzCwd5maxqgJXkQ=/636x358/smart/http%3A%2F%2Fprod.static9.net.au%2F_%2Fmedia%2FImages%2FKitchen%2F2015%2F09%2F02%2F10%2F48%2Fmlabeeflarb-recipe.jpg",
	   name: 'Beef Larb',
	   desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors'
	 },
	 {
	   image: "https://s3.amazonaws.com/foodfornet/wp-content/uploads/2017/08/Asian-Vermicelli-Stir-Fry-Final-1.jpg",
	   name: 'Stir-Fry Vermicelli Noodle',
	   desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors'
	 }
]


class HeaderBar extends React.Component {
	state = {
		openCart: false,
		openMenu: false,
		anchorEl: null,
		cartItems,
		name: '',
		emailPhone: '', 
		password: '',
		showSignUp: false
	}

	toggleDrawer = () => {
		this.setState({
			openMenu: !this.state.openMenu
		});
	};

	redirect = (path)=>{
		this.props.history.push(`/${path}`);
	}

	handleClick = event => {
		console.log(event.currentTarget);
		this.setState({ anchorEl: event.currentTarget });
	  };
	
	  handleClose = () => {
		this.setState({ anchorEl: null });
	  };

	  handleSignOut = ()=>{
		  this.props.signOut();
	  }

	  handleSignIn = ()=>{
		  this.props.signIn({
			  email: this.state.email,
			  password: this.state.password
		  });
	  }

	  handleSignUp =()=>{
		  this.props.signUp({
			  name: this.state.name,
			  emailPhone: this.state.emailPhone,
			  password: this.state.password
		  }, this.props.history);
	  }

	  toggleSignUp = ()=>{
		  this.setState({showSignUp: !this.state.showSignUp});
	  }

	  handleChange = (event)=>{
		  console.log(event.target.value);
		this.setState({[event.target.name]: event.target.value});
     }
     goToCart = ()=>{
        this.props.history.push('/cart');
     }

	render() {
      const { classes, user, cart } = this.props;
      let itemCount = 0;
      cart.forEach(item=>{
         itemCount = itemCount + item.qty
      });
		const { anchorEl } = this.state;
		return (
			<div className={classes.root}>

				{/* HEADER */}
				<AppBar position="static">
					<Toolbar className={classes.toolBar} >
						
						<IconButton
							// aria-owns={open ? 'menu-appbar' : null}
							aria-owns={anchorEl ? 'simple-menu' : null}
							aria-haspopup="true"
							// onClose={this.handleClose}
							color="inherit"
							
							onClick={this.toggleDrawer}
							>
							<MenuIcon />

						</IconButton>
						<Button className={classes.loginButton}color="inherit" onClick={()=>{this.props.history.push('/')}}>
                     CATED
						</Button>
						<IconButton
							// aria-owns={open ? 'menu-appbar' : null}
							aria-owns={anchorEl ? 'simple-menu' : null}
							aria-haspopup="true"
							// onClose={this.handleClose}
							color="inherit"
							// onClick={this.toggleDrawer}
                     // onClick={this.props.openCart}
                     onClick={this.goToCart}
						>	
							{cart.length > 0 ? <Badge badgeContent={itemCount} color="secondary">
							<ShoppingCart />
          					</Badge> : <ShoppingCart />}
							
							
						</IconButton>
					</Toolbar>
					
				</AppBar>

				{/* <Menu
					id="simple-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
					>
					<MenuItem onClick={this.handleClose}>Profile</MenuItem>
					<MenuItem onClick={this.handleClose}>My account</MenuItem>
					<MenuItem onClick={this.handleClose}>Logout</MenuItem>
				</Menu> */}

					
	
				<DrawerMenu 
					showSignUp={this.state.showSignUp} 
					toggleSignUp={this.toggleSignUp} 
					handleSignOut={this.handleSignOut}
					handleSignUp={this.handleSignUp}
					user={user} 
					openMenu={this.state.openMenu} 
					toggleDrawer={this.toggleDrawer}
               handleChange={this.handleChange}
               name={this.state.name}
               emailPhone={this.state.emailPhone}
               password={this.state.password}
				/>
			</div>
		);
	}
}

HeaderBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = {
	root: {
		flexGrow: 1,
		position: 'fixed',
		top: 0,
		width: '100%',
		zIndex: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	toolBar: {
		justifyContent: 'space-between'
	}
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart
	}
}

export default connect(mapStateToProps, {signOut, signUp})(withStyles(styles)(HeaderBar));