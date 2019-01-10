import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { addToCart } from './actions/itemAction';
import { drinkItems as drinks} from './dummy-data';

class DrinkList extends React.Component {

	state = {}
	addToCart = (item) => {
		console.log(item);
		this.props.addToCart(item)
		this.setState({ expanded: null, selectedSize: null });
	}
	render() {
		const { classes } = this.props;
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

export default connect(mapStateToProps, { addToCart })(withStyles(styles)(DrinkList));
