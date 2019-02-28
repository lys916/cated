import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { fireAuth } from "./config/firebase";
import { signOut } from './actions/userAction';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


class OrderCompleted extends React.Component {

	state = {}

	handleSignOut = () => {
		this.props.signOut(this.props.history);
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				Your order has been places. Thank you.
            <Button className={classes.backShopping} variant="contained" onClick={()=>{this.props.history.push('/')}}>
         Back to shopping
         </Button>
			</div>
         
		);
	}
}

const styles = {
	root: {
		paddingTop: 100
   },
   backShopping: {
      fontSize: 12,
      marginTop: 30,
     borderRadius: 100,
   },
};

const mapStateToProps = (state) => {
	return {}
}
export default connect(mapStateToProps, { signOut })(withStyles(styles)(OrderCompleted));