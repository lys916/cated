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
		console.log('did mount path', path);
		if(path === '/foods'){
			this.setState({value: 0});
		}
		if(path === '/drinks'){
			this.setState({value: 1});
		}
		if(path === '/supplies'){
			this.setState({value: 2});
		}
	}

	handleChange = (event, value) => {
		const history = this.props.history;
		if (value === 0) {
			history.push('/foods');
		}
		if (value === 1) {
			history.push('/drinks');
		}
		if (value === 2) {
			history.push('/supplies');
		}
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
					<Tab className={classes.tab}  label="Drinks" />
					<Tab className={classes.tab} label="Supplies" />
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
	},
	tab: {
		width: '100%',
		fontSize: 13
	}
};

export default withStyles(styles)(IconTabs);