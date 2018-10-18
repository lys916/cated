import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { removeFromCart } from './actions/itemAction';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import { Link } from 'react-router-dom';

const options = [
	'Remove'
  ];

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

class ModalCart extends React.Component {
	state = {
		open: false,
		title: '',
		desc: '', 
		amount: '',
		missingField: false,
		anchorEl: null,
		clickedId: null
	};

	componentDidMount(){
		// this.props.fetchTrans(this.props.user.email);
	}

	

	
	handleChange = (prop) => (event) => {
		this.setState({ [prop]: event.target.value, missingField: false });
	};
	handleSaveTran = ()=>{
		const {title, desc, amount} = this.state
		if(title !== '' && desc !== '' && amount !== ''){
			this.setState({open: false}, ()=>{
				this.props.addTran({
					title: this.state.title,
					desc: this.state.desc,
					amount: this.state.amount,
					email: this.props.user.email
				});
			});
		}else{
			this.setState({missingField: true});
		}
		
	}

	// open and close menu
	handleClick = (event, id) => {
		console.log('clicked id', id);
		this.setState({ anchorEl: event.currentTarget, clickedId: id });
	  };
	
	handleClose = (event) => {
		event.stopPropagation();
		console.log('closing');
		this.setState({ anchorEl: null, clickedId: null });
	};

	removeItem = ()=>{
		this.props.removeFromCart(this.state.clickedId);
	}

	render() {
		const { cart, classes } = this.props;
		let total = 0;
		cart.forEach(item=>{
			total += item.price[item.size];
		});
		const { anchorEl } = this.state;
		console.log(this.props.cart);
    const open = Boolean(anchorEl);
		return (
			<div className={classes.root}>

				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.props.open}
					onClose={this.props.closeCart}
				>
					<Card className={classes.modal}>
						<div className={classes.total}>
							<div># of items: {cart.length}</div>
							<div>Total: ${total}</div>
						</div>
						{this.props.cart.map((item, index)=>{
							return(
								<div>
									<div className={classes.name}>{index + 1}. {item.name} <span className={classes.unit}>{item.unit}</span></div>
								<div className={classes.item}>
									
									<div className={classes.flex}>
										<div><img className={classes.image} src={item.image} /></div>
										<div className={classes.info}>
								
											<div className={classes.price}>{`Size: ${item.size}`}</div>
											<div>{`Price: $${item.price[item.size]}`}</div>
										</div>
									</div>
									<IconButton
										aria-label="More"
										aria-owns={open ? 'long-menu' : null}
										aria-haspopup="true"
										onClick={(e)=>{this.handleClick(e, item.id)}}
										style={{padding: '0px', height: '26px', width: '26px', marginTop: '10px'}}
										>
										<MoreVertIcon />
									</IconButton>
									
									<Menu
										id="long-menu"
										anchorEl={anchorEl}
										open={open}
										onClose={this.handleClose}
										PaperProps={{
											style: {
											maxHeight: 48 * 4.5,
											width: 200,
											},
										}}
										name="test name"
										onClick={this.handleClose}
									>
									
										<MenuItem onClick={this.removeItem} id={item.id} key={'Remove'} selected={'Remove' === 'Pyxis'}>
										{'Remove'}
										</MenuItem>
									
									</Menu>
									
								</div>
								</div>
							)
						})}
						{/* <TextField
							id="standard-dense"
							label="Title"
							className={classes.input}
							margin="dense"
							value={this.state.title}
							onChange={this.handleChange('title')}
							// InputProps={{
							// 	startAdornment: <InputAdornment position="start">$</InputAdornment>,
							//  }}
						/>
						<TextField
							id="standard-multiline-static"
							label="Description"
							multiline
							rows="2"
							//  defaultValue="Default Value"
							className={classes.input}
							margin="normal"
							value={this.state.desc}
							onChange={this.handleChange('desc')}
						/>
						<TextField
							id="standard-dense"
							label="$ Amount"
							className={classes.input}
							margin="dense"
							value={this.state.amount}
							onChange={this.handleChange('amount')}
							// InputProps={{
							// 	startAdornment: <InputAdornment position="start">$</InputAdornment>,
							//  }}
						/> */}

						<div className={classes.clearBtn} onClick={this.props.closeCart}>
							<ClearIcon style={{fontSize: '18px', padding: '5px 6px 2px 6px'}} />
						</div> 
						
						<Button variant="contained" color="primary" className={classes.save} onClick={this.props.openDetails}>
							Proceed To Checkout
						</Button>
						{this.state.missingField ? <div>All fields required</div> : null}
					</Card>
				</Modal>

			</div>

		);
	}
}


// initialize prop classes
ModalCart.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
	modal: {
		position: 'relative',
		width: '90%',
		height: '90%',
		margin: '10px auto',
		padding: '30px 5px 0px 5px',
		//   width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		//   padding: theme.spacing.unit * 4,
		overflow: 'auto'
	},
	image: {
		height: 63,
		width: 63,
		border: '1px solid #dedede',
		borderRadius: 5,
		objectFit: 'cover'
	  },
	card: {
		width: '97%',
		margin: "5px auto",
		textAlign: 'left'
	},
	clearBtn: {
		position: 'absolute',
		top: 3,
		right: 3,
		background: '#999999',
		color: 'white',
		borderRadius: '100%'
	},
	input: {
		width: '100%',
	},
	save: {
		width: '100%',
		margin: '20px 0px 40px 0px'
	},
	item: {
		display: 'flex',
		padding: 5,
		borderBottom: '1px solid #dedede',
		justifyContent: 'space-between',
		alignItem: 'center'
	},
	unit: {
		fontSize: 12
	},
	name: {
		fontSize: 15,
		color: '#111111',
		paddingLeft: 5,
		fontWeight: 'bold'
	},
	size: {
		fontSize: 14
	},
	info: {
		paddingLeft: 10
	},
	total: {
		display: 'flex', 
		justifyContent: 'space-between', 
		fontSize: 18,
		margin: 5,
		background: '#efefef',
		padding: 10
	},
	flex: {
		display: 'flex'
	}
});

// const styles = {
// 	root: {
// 		paddingTop: 70,
// 		paddingBottom: 100,
// 	},
// 	card: {
// 		marginRight: "100px",
// 		width: '100%',
// 		textAlign: 'left'
// 	},
// 	button: {
// 		position: 'fixed',
// 		bottom: 80,
// 		right: 10
// 	}
// };

const mapStateToProps = (state) => {
	return {
		cart: state.cart
	}
}


export default connect(mapStateToProps, {removeFromCart})(withStyles(styles)(ModalCart));
