import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const DrawerMenu = ({ openMenu, toggleDrawer, classes, user, handleSignOut, handleSignIn, email, password, handleChange, toggleSignUp, showSignUp, handleSignUp }) => {
	return (
		<Drawer anchor="left" open={openMenu} onClose={toggleDrawer} style={styles.menu}>
			{user ? <div
				tabIndex={0}
				role="button"
				onClick={toggleDrawer}
				onKeyDown={toggleDrawer}
				className={classes.menu}>
				{/* MENU LIST */}
				<List component="nav">

					<Link to="/orders">
						<ListItem button>
							<ListItemText primary="My orders" />
						</ListItem>
					</Link>

					<ListItem button>
						<ListItemText primary="Settings" />
					</ListItem>

					<ListItem button onClick={handleSignOut}>
						<ListItemText primary="Log out" />
					</ListItem>

				</List>
			</div> : 
			<div style={styles.menu}>
				{showSignUp ? 
				<div>
					<div style={styles.title}>Sign up</div>
					<input style={styles.input} placeholder="Name" value={email} onChange={handleChange}  name="name"/>
					<input style={styles.input} placeholder="Email" value={email} onChange={handleChange}  name="email"/>
					<input style={styles.input} placeholder="Password" value={password} onChange={handleChange} name="password"/><br/>
					<button style={styles.button} onClick={handleSignUp}>Sign in</button>
					<div>Already have an account? <span onClick={toggleSignUp}>Log in!</span></div>
				</div> : 
				<div>
					<div style={styles.title}>Log in to view your account</div>
					<input style={styles.input} placeholder="Email" value={email} onChange={handleChange}  name="email"/>
					<input style={styles.input} placeholder="Password" value={password} onChange={handleChange} name="password"/><br/>
					<button style={styles.button} onClick={handleSignIn}>Sign in</button>
					<div>Don't have an account? <span onClick={toggleSignUp}>Sign up!</span></div>
				</div>
				}
				
			</div>}
			
		</Drawer>
	)
}

const styles = {
	menu: {
		width: '75vw',
		textAlign: 'center'
	},
	input: {
		padding: 10, 
		margin: 5
	}, 
	title: {
		marginTop: 20
	},
	button: {
		padding: '5px 10px'
	}
};

DrawerMenu.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerMenu);