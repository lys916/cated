import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {signIn} from './actions/userAction';


class Login extends React.Component {
	state = {
		password: '',
		email: '',
		showPassword: false,
	};
	handleChange = (prop) => (event) => {
		this.setState({ [prop]: event.target.value });
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	handleSignIn = ()=>{
		this.props.signIn({
			email: this.state.email,
			password: this.state.password
		});
	}

	render() {
		if(this.props.user){
			this.props.history.push('my-trans');
			return null;
		}
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<TextField
					// id="outlined-adornment-weight"
					className={classes.input}
					variant="outlined"
					label="Email"
					value={this.state.email}
					onChange={this.handleChange('email')}
				/>


				<TextField
					// id="outlined-adornment-password"
					className={classes.input}
					variant="outlined"
					type={this.state.showPassword ? 'text' : 'password'}
					label="Password"
					value={this.state.password}
					onChange={this.handleChange('password')}
					InputProps={{
						// add the eye
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="Toggle password visibility"
									onClick={this.handleClickShowPassword}
								>
									{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<Button variant="contained" color="primary" className={classes.input} onClick={this.handleSignIn}>
					Login
				</Button>
				<div>Don't have an account? <Link to="/register"><span>Sign-up!</span></Link></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = {
	root: {
		marginTop: 50
	},
	input: {
		width: '85%',
		margin: '10px 0px'
	}
};

// export default connect(mapStateToProps, {  })(Login);
export default connect(mapStateToProps, {signIn})(withStyles(styles)(Login));

