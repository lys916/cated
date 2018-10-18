import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import TextField from '@material-ui/core/TextField';

const drinks = [
	{
	image: "https://i5.walmartimages.com/asr/1d43b8ff-03a1-40c6-933c-12cb6f3617db_2.b7361afd51f27cb38679f59f2d97d3ed.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff",
	  name: 'Heineken',
	  tags: 'Beer',
	  price: 19,
	  unit: '12 Pack'
	},
	{
	  image: "http://www.lcbo.com/content/dam/lcbo/products/515643-A.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
		name: 'Corona Extra',
		tags: 'Beer',
		price: 19,
		unit: '12 Pack'
	  },
	  {
		image: "https://reservebar-cdn.global.ssl.fastly.net/media/catalog/product/cache/1/thumbnail/1000x1278/9df78eab33525d08d6e5fb8d27136e95/h/e/hennessey_vsop.jpg",
		  name: 'Henessy VSOP',
		  tags: 'Liqour',
		  price: 69,
		  unit: '750ML'
		},
		{
		  image: "https://products3.imgix.drizly.com/ci-patron-silver-25fa130a809ea038.jpeg?auto=format%2Ccompress&fm=jpeg&q=20",
			name: 'Patron Silver',
			tags: 'Liqour',
			price: 59,
			unit: '750ML'
		  }
  ]

class UserList extends React.Component {

	state = {}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				{drinks.map(drink=>{
					return (
					<Card className={classes.card}>
						<CardMedia
							className={classes.image}
							image={drink.image}
						/>
							<CardContent className={classes.content}>
							<Typography component="h5" variant="title">
								{drink.name} <span style={{fontSize: '13px'}}>{drink.unit}</span>
							</Typography>
							<Typography variant="subtitle1">
								<div>{`Price: $${drink.price}`}</div>
							</Typography>
							<div>Quantity</div>
							<div style={{display: 'flex'}}>
							<input style={{width: '50px', padding: '5px'}} value='1'/>
							<button>Add To Cart</button>
							</div>
							</CardContent>
						
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
		display: 'flex',
		textAlign: 'left',
		marginTop: 10
	  },
	image: {
		width: 150,
		borderRight: '1px solid #dedede'
	}
};

const mapStateToProps = (state) => {
	return {}
}

export default connect(mapStateToProps, {})(withStyles(styles)(UserList));
