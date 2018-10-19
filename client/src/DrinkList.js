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
		image: "https://lh3.googleusercontent.com/6B9HtJ2SvsgUPt0AWGYZY2DsxFh7HludmmeM0i3cK9mEAJx44VTOy9sRD9iv4r7DXTFkYrkg5zzc_KUJyYOaBcZ9Qqj9rHBi2iFZCKHsmklNlXQ8kaAC4g3fZTWBjKYeTwV5NW2x7g3XxCGOcUOTJLGlPR3pgwaSb3cQfMcbBtM8ZoB6QHIoFp27vnnrU2ux7uJYSxn510ZOnfTo0ZrJv68yFXbcDEyK7feh58o5FboVKHSY1BTosjo8vlayRp8DqLsFGDdSBVps41cFOjr1kH4WOdCAQywYl9x9xW70333raRRHJRgd20MIbbyaOFgto8KtLSSFLjvpF98k208y-Udcnf7s5Ke_75vm-UvUXiGhgTiD7J7rX-iCVmi4udrswjiyoJASKOGdu6e6EZ9vYW7Cf0tHx2Cb1MnFLCqDYEuDy1GmqACRk4L3ixXJpKpJ5IhoM0pX-aWpj99kEooB93RihMznSMQUhB3M69EqSiJNDlTigP6zZe5VJf-bxylTniYuIDAXr9zVcJTACQzrCia6a9pb6E9paWHLhhLgDZHaoyMrByfxe7z_wdDBA2MFmquBIgKkh1r4KH87fLI1v2GCVLqR18KDlIdrKLTMKOOXrfRtMNFioUuo4jalIA=w529-h613-no",
		name: 'Heineken',
		tags: 'Beer',
		price: 19,
		unit: '12 Pack',
		id: 22
	},
	{
		image: "http://www.lcbo.com/content/dam/lcbo/products/515643-A.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
		name: 'Corona Extra',
		tags: 'Beer',
		price: 19,
		unit: '12 Pack',
		id: 23
	}, {
		image: "https://lh3.googleusercontent.com/5U-aDTAnoc1zQwVCUqrMlohDUTet2qpjwKFz3rhsj4or3iIik0HKL_RgDBa8OUnheGC63KVWP0Kt06HcHt3ikzpQ2sIYSq8Hkvv82mZPamk3iE8pE2SwMl4jkG_1_IEgQD0uFIzB9SeZudGn9ymTTDxipTUeB2JLjJEIuWKmWDQz2KfzJvuET4n2FDVZMmiZsDah_KSZhmtR5zsZwyhC3bwCX29_ghaplSaE_NW9cDPpQO5e1sWkibH-xYB6HmL4OUroKH5YH0_0arEsQ9B_MeSDH8H66sKu_-3b7zXRCNlDRhOLnvaQICEKvlQ_uYlvQi7TfpTqbxG15yID6aCMBO6pt6MYkEwgNfCmjrT74-IOATgeRgB4SKvtnbA2DrS-2WKwDlfFzTfsowT8jlyvxGzl5DV3Wv6DySc4uw6XbRMPylc_cwxZOysBkzq4y-1zv6heb1hcT7rtY8UkuxJmpZkwZmmxznul4YIVh0REOx7wSQey9JqaGSwDgRXQMBx7lTfimvzkGxT7lDSJPyAwc3WldG0UYVoWUK5vbq00dcUG0dhfFDq7og8fXW8g-wNOHPrcGzdjDHzIvi0VEwKeQI1lnblGlurV4QMdIgEQcDKYI2-YqRL3A6IYt5rm0w=w176-h217-no",
		name: 'Sierra Nevada Pale Ale',
		tags: 'Beer',
		price: 19,
		unit: '12 Pack',
		id: 24
	},
	{
		image: "https://lh3.googleusercontent.com/Ynrnyytsbun49R6A3WYvx0ECA10m6tCc8o7tIuaOGrFGvCWkveIKHtj57KwkOpxJD8sPf2fFuJ-f8B8OdqtK8-ODlRVP2UTPNMU5Lukcy9ATSyCWgBePe-aZ_jBTmziBH_NFHMkgd4_JpWbp_agkmDp0eHB75kk76PNP9is63dy8tAsyCB9YlBrCLIiBGfxtEgRHxF2dtjViHdzloo0XWUZf4lfjYjSbIbwl8D9iqrERJtdIZ1EVbN12pSeONagrBhHn7WFZ8hCMRZNHttNEDDfm9vBnFkTo7j1wn4hVNZv-hKFkIUe2y3ZdHlAhaTZuw0sRzU5f54eQMXZZv7E1N0t0fXiNkHheK5AOsKHPhQ8n__olQtDH0SNIbf1UDHhaR7XnD7CsdLcNHPkar63HCIqN2UHB1TtNbaMsPMAMW_rGwtY2F0lM3cZcPxMB-i7RqtLEt8sBLgkePw4SJiVDNlmjVENnGyivt_Y3veKxASTDkRg_mbelg8S5hGberyVh39ikpb9ttyl7hh8DyUEITCFhEbcKf53Uv-Yu_alQY_KKAoiUT5GCcfdzD-yx1TxyN3kEjDAb_ZOnVSasJcCBszLMTqYXOngVJwtSm-Jy9aHX5OPIVSY6oy_lnZqNHg=w442-h511-no",
		name: 'Henessy VSOP Privilege Cognac',
		tags: 'Liqour',
		price: 69,
		unit: '750ML',
		id: 25
	},
	{
		image: "https://lh3.googleusercontent.com/DfjcbWCgOPFmq3oh8UtPywmoNUjMeqmuUyYpHnRJ-_EoyAiPsOP88FrpPY7WAjV4rU3biG-6NwARWAccM71AROHUm46v__age2Cz3J3RHDJsFe7gAwxp9hpC38LBCiAKuAgw3IKiAvY8UfnLovk63I6-LZkLqaZiy7eG-tpY_y5BaaZUmevv3-3YYMq-oi_9WZfHIbY9-tLM1wqHwFRvk47tSchsAfLOMKn8qVmGuXXHlb8bNDeFM-2YfygFJrmPcuQqSRqSLzJuiicuZqUJEFub-qscfPpfP71J2jN9qCaYzGrtZ5-s6twhX9OB28wP2dzEL5WJxWAUY-fwebXNW4r9fXWw7uKzBvleIxsE0_Aq40ZnDVdjevQnSanL-GnghyZNm2Si47hqlW-WfG_mPUg7hnOB5YxYDUdY9YFn2oV5kzab2DBm3wWWe-JOBD2bTDFFAW1HH3RgFzSB9w-KNCnkHffC5GD5fubDLMFrmeGgcLBTWHt6n3FxnvbFUHDNBS9XAR_TRz4kL5VFovT_w976KQzZ0inKR_VoT6iUc1f4vhdVVsh3fKDMdlwH-jv2QSLz2-xNkeskgAwJcxcJuzlsfTZ8ce7xOyLhgxVk4yYq7D8f679MlHsg0iDXQw=w348-h410-no",
		name: 'Patron Silver Tequila',
		tags: 'Liqour',
		price: 59,
		unit: '750ML',
		id: 26
	},
	{
		image: "https://lh3.googleusercontent.com/xMx2GnvgwKW7iDT14Rmhcq4RnSTzWzmxG4Eq1d-b4w6Jhyt3Q44L32LUCaJEJtR_EObzHiphihB0Bisyd59_jgEt7t6icSOXo2V5-AGYr_HvFYlYKiZKwJU2IjTGORx6yXCZU_X5tvRjFwxZzhSBjkvBuRFpbUFAfTnFGalUGTGBr-CU39Rjq_7iDW40vHuJ1JUyt-7Szu1fVSWj5KXp8ZDfO92DDX_M6YE1cIYeWPUnXuZxFKV3FfnjBY2BuiaHNR_OA-XZCvPxdDkF30u-_mBPqcj3nPULTwEBkuolCBNnEBQKMlW3RJoX5ruxgl-rfhNl8OQui19MEQEPlCQHm8gDKrW7rX2utwxjNUYZzTzf74O91mGbNOk7_z2xj3slUnKlJopKaCh46uoEHduUtboOSDH5aRJOpEL5V7I3a6AhhZbH2Wiuw89Cp6J3Ad7A307StfCNeledXzPOCYkKCyfQxfyxe5M5aad2rnlv05fQ_Tm0AcZDgQFZqE-1qK44woG82BZ8TmSxEDgbOXhqS1FA0v062Pr72oqmu03qEMqNidu-UnjnoU8MjLdRG3eMSHMTw6Q0hZEqFGfsWjvMfcRNFSF5fDDkLnQVWv5K43NvznQGaefNjmV0cd4Uvg=w475-h601-no",
		name: 'Jameson Whiskey',
		tags: 'Liqour',
		price: 59,
		unit: '750ML',
		id: 27
	}
]

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
