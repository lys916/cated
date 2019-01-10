import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createOrder } from './actions/orderAction'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import DatePicker from './DatePicker';

class ModalDetails extends React.Component {
	state = {
	};

	render() {
		const { } = this.props;
		let total = 0;
		cart.forEach(item => {
			total += item.price[item.size];
		});
		return (
			<div className={classes.root}>

				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.props.open}
					onClose={this.props.closeCart}
				>
					<Card className={classes.modal}>
						<div>Contact and Delivery Details</div>
						<div style={{ color: 'red' }}>{detailError}</div>
						<br />

						<TextField
							id="standard-dense"
							label="Contact Name"
							className={classes.input}
							margin="dense"
							value={delName}
							onChange={handleChange('delName')}
						/>


						<TextField
							id="standard-dense"
							label="Address"
							className={classes.input}
							margin="dense"
							value={delAddress}
							onChange={handleChange('delAddress')}
						/>
						<TextField
							id="standard-dense"
							label="Phone Number"
							className={classes.input}
							margin="dense"
							value={delPhone}
							onChange={handleChange('delPhone')}
						/>
						<DatePicker dateChange={dateChange} delTime={delTime} />

						<div className={classes.clearBtn} onClick={this.props.closeDetails}>
							<ClearIcon style={{ fontSize: '18px', padding: '5px 6px 2px 6px' }} />
						</div>

						<Button variant="contained" color="primary" className={classes.save} onClick={this.props.openCheckOut}>
							Next
						</Button>
						{this.state.missingField ? <div>All fields required</div> : null}
					</Card>
				</Modal>

			</div>

		);
	}
}


// initialize prop classes
ModalDetails.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
	modal: {
		position: 'relative',
		width: '90%',
		height: '90%',
		margin: '10px auto',
		padding: '30px 10px 0px 10px',
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
		border: 'none',
		borderBottom: '1px solid gray',
		outline: 'none'
	},
	inputocus: {

	},
	label: {
		fontSzie: 14,
		color: 'gray'
	},
	save: {
		width: '100%',
		margin: '20px 0px 40px 0px'
	},
	item: {
		display: 'flex',
		padding: 5,
		borderBottom: '1px solid #dedede'
	},
	unit: {
		fontSize: 12
	},
	name: {
		fontSize: 16,
		color: '#111111',
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
	}
});


const mapStateToProps = (state) => {
	return {
		cart: state.cart
	}
}

export default connect(mapStateToProps, { createOrder })(withStyles(styles)(ModalDetails));
