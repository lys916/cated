import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
				<div style={styles.inputWrapper}>
					<div style={styles.title}>Sign up</div><br/>

               <label style={styles.label}>Full Name</label>
					<input style={styles.input}  value={email} onChange={handleChange}  name="email"/>
               <br/><br/>
               
               <label style={styles.label}>Email or Phone Number</label>
					<input style={styles.input}  value={email} onChange={handleChange}  name="email"/>
               <br/><br/>

               <label style={styles.label}>Password</label>
					<input style={styles.input} value={password} onChange={handleChange} name="password"/><br/>
               <br/>

               <Button variant="contained" 
						color="primary" 
						style={styles.button} 
						onClick={handleSignUp}>
							Sign up
					</Button>

					<br/><br/>
					<div style={styles.title}>Already have an account? <span onClick={toggleSignUp}>Sign in!</span></div>
				</div> : 
				<div style={styles.inputWrapper}>

					<div style={styles.title}>Log in to manage your account</div><br/>
               
               <label style={styles.label}>Email or Phone Number</label>
					<input style={styles.input}  value={email} onChange={handleChange}  name="email"/>
               <br/><br/>

               <label style={styles.label}>Password</label>
					<input style={styles.input} value={password} onChange={handleChange} name="password"/><br/>
               <br/>

               <Button variant="contained" 
						color="primary" 
						style={styles.button} 
						onClick={handleSignIn}>
							Sign in
					</Button>

					<br/><br/>
					<div style={styles.title}>Don't have an account? <span onClick={toggleSignUp}>Sign up!</span></div>
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
	// input: {
	// 	padding: 10, 
	// 	margin: 5
   // }, 
   inputWrapper: {
      textAlign: 'left',
      padding: 15
   },
   input: {
      width: '100%',
      fontSize: 17,
      borderRadius: 6,
      border: '1px solid #ababab',
      paddingLeft: '3px',
      height: 42,
     },
	title: {
      marginTop: 20,
      textAlign: 'center',
      fontWeight: 'bold'
	},
	button: {
      width: '100%',
	}
};

DrawerMenu.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerMenu);