// import React from 'react';
// import PropTypes from 'prop-types';
// import Paper from '@material-ui/core/Paper';
// import { withStyles } from '@material-ui/core/styles';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import PhoneIcon from '@material-ui/icons/FormatListBulleted';
// import FavoriteIcon from '@material-ui/icons/People';
// import PersonPinIcon from '@material-ui/icons/Settings';
// import { Link } from 'react-router-dom';

// class IconTabs extends React.Component {
// 	state = {
// 		value: 0
// 	};


// 	render() {
// 		const { classes } = this.props;
// 		return (
// 			<Paper square className={classes.root}>
// 				<Tabs
// 					value={this.state.value}
// 					onChange={this.handleChange}
// 					fullWidth
// 					indicatorColor="primary"
// 					textColor="primary"
// 				>
// 					<Tab className={classes.tab}  label="Foods" />
// 					<Tab className={classes.tab}  label="Drinks" />
// 					<Tab className={classes.tab} label="Supplies" />
// 				</Tabs>
// 			</Paper>
// 		);
// 	}
// }

// IconTabs.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };

// const styles = {
// 	root: {
// 		flexGrow: 1,
// 		marginTop: 56
// 	},
// 	tab: {
// 		width: '100%',
// 		fontSize: 13
// 	}
// };

// export default withStyles(styles)(IconTabs);