import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { addTran, fetchTrans } from './actions/tranAction';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

import CardContent from '@material-ui/core/CardContent';
// import { Link } from 'react-router-dom';

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

class MyTrans extends React.Component {
	state = {
		open: false,
		title: '',
		desc: '', 
		amount: '',
		missingField: false
	};

	componentDidMount(){
		this.props.fetchTrans(this.props.user.email);
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
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
	render() {
		const { transactions, classes } = this.props;
		console.log('all transactions', transactions);
		return (
			<div className={classes.root}>
				{/* <CircularProgress className={classes.progress} /> */}

				{/* check if object is empty */}
				{Object.keys(transactions).length < 1 ? <div>You have no transaction</div> : null}

				{Object.keys(transactions).map(key=>{
					return (
						<CardActionArea key={key} className={classes.card}>
							<Card>
								<CardContent>
									{transactions[key].title}
								</CardContent>
							</Card>
						</CardActionArea>
					)
				})}



				<Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={this.handleOpen}>
					<AddIcon />
				</Button>

				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}
				>
					<div className={classes.modal}>
						
						<TextField
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
						/>
						
						<Button variant="contained" color="primary" className={classes.save} onClick={this.handleSaveTran}>
							Save
						</Button>
						{this.state.missingField ? <div>All fields required</div> : null}
					</div>
				</Modal>

			</div>

		);
	}
}


// initialize prop classes
MyTrans.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
	modal: {
		position: 'relative',
		width: '90%',
		height: 300,
		margin: '10px auto',
		padding: '0px 10px',
		//   width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		//   padding: theme.spacing.unit * 4,
	},
	root: {
		paddingTop: 70,
		paddingBottom: 100
	},
	card: {
		width: '97%',
		margin: "5px auto",
		textAlign: 'left'
	},
	button: {
		position: 'fixed',
		bottom: 80,
		right: 10
	},
	input: {
		width: '100%',
	},
	save: {
		width: '100%',
		margin: '20px 0px 0px 0px'
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
		transactions: state.transactions
	}
}


export default connect(mapStateToProps, {addTran, fetchTrans})(withStyles(styles)(MyTrans));
