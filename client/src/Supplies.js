import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { addToCart } from './actions/itemAction';

const drinks = [
	{
		image: "https://lh3.googleusercontent.com/ueiEzjrQ71IToirKe3npl_8Pha90TengRo4IkBIlfEd7FCG9tU4MDfjJHXBNjPsKb010MH_afBy9lD6dOv_nVVsl8sJEIAPU5UJ21ZkLejNFltaCol0lMlwCR0YiRbRu18VW0WEkqoM_ysv_fl_DqibakBwC5juq37Fs43GlFTGne-dXhj81Oah7jongkHn1FzVBm0rW63oKKDVibvpfBxRhcw7IBxbNI8LR14tewtZOjqkQBB4i6iY9lLKiRtffZm6i4CnKdNbWHQUxS600g1x6aB6_FejKtMmLlV5tqRYCN4Ur_pXkWVFc6wISSj3fPvFCC3LxZFcguVIhoLu9FSrwdtMx0MzBotIghJ45aCp6rJDNchTfw7P4tRQBc_QxGJGcimP8qFHhQSXKHoMB2EbqLEnHhT4KbEBTPBs3UEEnljnpnOV6Fec2czcirjulhF9SjRAttrUbnfiEBaSWiSsn6a7tOV_Lye8x41ry4NHLG4C72Z4D27y4yqEQasEDCKszurrZb0Spfpkgl-YvvSr0aMPluifgWyxtGGcO5LpOEsK1LhCN4A7ERIolqo8yoY8kEX8j9jpn7ndg5ahZDM545qEfRhlZZub7bW7JdBSfvXLbY3AwAPicVj_V8g=w326-h403-no",
		name: 'Paper Plates',
		tags: 'Paper Plate',
		price: 5.99,
		unit: '25 plates',
		id: 100
	},
	{
		image: "http://www.diamondbrands.com/portals/0/Images/Products/plastic/dailyFork_lg.png",
		name: 'Plastic Forks',
		tags: 'Beer',
		price: 3.99,
		unit: '48 pc.',
		id: 101
	}, {
		image: "https://images-na.ssl-images-amazon.com/images/I/51GsivNW8gL._SX425_.jpg",
		name: 'Playing Cards',
		tags: 'Beer',
		price: 4.99,
		unit: 'Red',
		id: 102
	},
	{
		image: "https://lh3.googleusercontent.com/SFKsl6-ECbG3KYPUko88wuW7NELbiknndhIIRUr6dZrYTj98Ea3h-z5L8rxiYigONM0yc4AoAJuqi3WYUEmDE7abXAspRJ56F5HhNEmTzuyPh0eFJxit4qitm_BboLZ_JD4ufnHQvHC3ja3aZfs0cZsMHwSyt_aIJoWmjvZi92YOljY4p0WQFFTmF9coEOaJe0dUQlu284yALDY_32WyokeEfPH9JI7qI4x8eF6oFLZoLCvKoAzTkxemkNAQTuECpGZ6jru9dZ-xpTZoPy-7XdV7A34jal5mNBP7Y5Z4h4GpoxF6pU_BxsIIYyjYt0dVtQpD0JrGgNE0K615w-2I4oSjfUFt_UGEEEHIo9sw44hoQMcdWWgPcA5sZtQCP718G9wXc2QHY2onbh1Y7QP859a3vBXCOrx5k8VAZuUZB5F_WYxcNyg5CoP3cKUNe-c1qS-EFnzDKzW_9H1MphfU8jK4oKNlBCvlPm_1hjYp2NNjIWr0EBnhA9IZbVLHY4oE5woOqbgPnM26KeVTEywi0QhjGjh3rnDLTyqLsxMa7LqYbyEbsz1cKBucuulVHtPf0OEqqNJwd9L5akMlTyFC3VKEmpM8LXC1MszwpfKiPcPsWIrdTTHnV3HpCLm97w=w389-h416-no",
		name: 'Playing Cards',
		tags: 'Liqour',
		price: 4.99,
		unit: 'Blue',
		id: 103
	},
	{
		image: "https://lh3.googleusercontent.com/2UJ-zhiyVCQIPdlThVtQCZox9vKYWD72h2OM8xW-uOyPNcAqkmSoPYThBxqy52iUtGWAX7e5GldQoQnVrcKmTqm33v0bibtVb4NH04Kb63XVYaLfoq0aldY5No4qaNnc4EAFjjuCl2DvYQWJEWN0ZUpiWDukqBFsHh9CpEaQdFjOFUziOFEWQ5c2t-o-1-4Rn5gsXzEvvoiIf9GoMi4CuRim5jtj2qLhVRLuQScnPA9B77yPOmehDspkKnReFQabfxEirA8GfE12GL_hSOC7icrsFcVk8lv8qgO_JrdCfrB20CPI8LRbj1yYqOyY6XSWlIN-puBPTS1QmcyI6DzhLv5zPSCQQhvbrxb9GvnpLZDBJjdwvpabms0zQp1o_Q6-kfbRc2X_QcwhtDitKzmPrLO4l6xNt6ElHN4Wk-51_g7EldxYki2WLqeFUszipVTC-Zjyp-BUi3XFv7kkVW4CfepizoRVp0UkOOGt4NYoKb36_ek2diwTw03a5WKW3kuSh0NMuGHV-jlFOs5NfWiJNsa8mh11WllWUlDhJCk2MPK1d4O_PqMdsDynfoCGTC71gmvY1aNzjGGuaYtck124Hju7ytJrcpUQEmzyKkC1clfK_XfYbncNKlq9Cc856g=w359-h450-no",
		name: 'Kingsford Match Light Charcoal',
		tags: 'Charcoal',
		price: 14.99,
		unit: '11.6 lb',
		id: 104
	}
]

class Supplies extends React.Component {

	state = {}
	addToCart = (item) => {
		console.log(item);
		this.props.addToCart(item)
		this.setState({ expanded: null, selectedSize: null });
	}
	render() {
		const { classes } = this.props;
		console.log('SUPPLIES');
		return (
			<div className={classes.root}>
				{drinks.map(drink => {
					return (
						<Card className={classes.card}>
							<Typography component="h5" variant="title" className={classes.name}>
								{drink.name} <span style={{ fontSize: '13px' }}>{drink.unit}</span>
							</Typography>
							<div className={classes.cardContent}>
								<CardMedia
									className={classes.image}
									image={drink.image}
								/>
								<CardContent className={classes.content}>

									<Typography variant="subtitle1">
										<div>{`Price: $${drink.price}`}</div>
									</Typography>
									<div>Quantity</div>
									<div style={{ display: 'flex' }}>
										<input style={{ width: '50px', padding: '5px' }} value='1' />
										<button onClick={() => { this.addToCart(drink) }}>Add To Cart</button>
									</div>
								</CardContent>
							</div>
						</Card>
					)
				})}

			</div>
		);
	}
}

const styles = {
	root: {
		padding: 5
	},
	content: {
		width: '100%'
	},
	price: {
		border: '1px solid red',
		paddingBottom: -12,
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%'
	},
	card: {
		textAlign: 'left',
		margin: 10
	},
	cardContent: {
		display: 'flex',
		textAlign: 'left',
		borderTop: '1px solid #dedede'
	},
	image: {
		width: 150,
		borderRight: '1px solid #dedede',
		objectFit: 'cover'
	},
	name: {
		paddingLeft: 8
	}
};

const mapStateToProps = (state) => {
	return {}
}

export default connect(mapStateToProps, { addToCart })(withStyles(styles)(Supplies));
