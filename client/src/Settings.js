import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { fireAuth } from "./config/firebase";
import { signOut } from './actions/userAction';
import { withStyles } from '@material-ui/core/styles';


class Settings extends React.Component {

	state = {}

	handleSignOut = () => {
		this.props.signOut(this.props.history);
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				Settings component
				<button onClick={this.handleSignOut}>singOut</button>
			</div>
		);
	}
}

const styles = {
	root: {
		paddingTop: 100
	}
};

const mapStateToProps = (state) => {
	return {}
}
export default connect(mapStateToProps, { signOut })(withStyles(styles)(Settings));