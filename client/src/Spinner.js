import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { fireAuth } from "./config/firebase";
import { signOut } from './actions/userAction';
import { withStyles } from '@material-ui/core/styles';


class Spinner extends React.Component {

	state = {}

	render() {
		return (
			<div style={styles.root}>
				<img style={styles.spinner}src="/images/spinner.gif" />
			</div>
		);
	}
}

const styles = {
	root: {
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.6)',
      position: 'fixed',
      top: 0
   },
   spinner: {
      fontSize: 44,
      position: 'fixed',
      width: 50,
      top: window.innerHeight / 2,
      left: window.innerWidth / 2 - 25,
      zIndex: 1
   },
};

const mapStateToProps = (state) => {
	return {}
}
export default connect(mapStateToProps, { signOut })(withStyles(styles)(Spinner));