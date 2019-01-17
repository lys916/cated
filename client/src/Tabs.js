import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/FormatListBulleted';
import FavoriteIcon from '@material-ui/icons/People';
import PersonPinIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';

const tabs = {
	food: ['All', 'Chicken', 'Beef', 'Pork', 'Seafood', 'Salad', 'Appetizer', 'Others']
}

class IconTabs extends React.Component {
	state = {
		value: 0
	};

	componentDidMount(){
		const path = this.props.history.location.pathname;
		if(path === '/t/foods'){
			this.setState({value: 0});
		}
		if(path === '/t/grill'){
			this.setState({value: 1});
		}
		if(path === '/t/drinks'){
			this.setState({value: 2});
		}
		// if(path === '/t/supplies'){
		// 	this.setState({value: 3});
		// }
	}

	handleChange = (event, value) => {
		const history = this.props.history;
		if (value === 0) {
			history.push('/t/foods');
		}
		if (value === 1) {
			history.push('/t/grill');
		}
		if (value === 2) {
			history.push('/t/drinks');
		}
		// if (value === 3) {
		// 	history.push('/t/supplies');
		// }
		this.setState({ value });
	};

	

	render() {
		const { classes } = this.props;
		return (
			<div>
			<Paper square className={classes.root}>
				<Tabs
					value={this.state.value}
					onChange={this.handleChange}
					fullWidth
					indicatorColor="primary"
					textColor="primary"
				>
					<Tab className={classes.tab}  label="Foods" />
					<Tab className={classes.tab}  label="Grilling" />
					<Tab className={classes.tab}  label="Drinks" />
					{/* <Tab className={classes.tab} label="Supplies" /> */}
				</Tabs>
			</Paper>
			
			</div>
		);
	}
}

IconTabs.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = {
	root: {
		flexGrow: 1,
      marginTop: 56,
      position: 'fixed',
      width: '100vw',
      zIndex: 1
	},
	tab: {
		width: '100%',
		fontSize: 13
	}
};

export default withStyles(styles)(IconTabs);