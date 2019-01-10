import React from 'react';
import { connect } from 'react-redux';
import HeaderBar from './HeaderBar';
import ModalCart from './ModalCart';
import ModalDetails from './ModalDetails';
import ModalCheckOut from './ModalCheckOut';
import IconTabs from './Tabs';
import {Elements, StripeProvider} from 'react-stripe-elements';

// import { Link } from 'react-router-dom';
Date.prototype.addMinutes = function(minutes) {
	this.setMinutes(this.getMinutes() + minutes);
	return this;
};

class Home extends React.Component {

	state = {
		openCart: false,
		openCheckOut: false,
		openDetails: false, 
		delName: '',
		delAddress: '',
		delPhone: '',
		delTime: new Date().addMinutes(60),
		nameOnCard: '',
		detailError: '',
		checkOutError: '',
		cartError: ''
	}

	componentDidMount() {
		console.log('comp mount');
		const path = this.props.history.location.pathname;
		
	}

	handleOpenCart = () => {
		this.setState({ openCart: true });
	};

	handleCloseCart = () => {
		this.handleCloseAll();
	};

	handleOpenDetails = () => {
		if(this.props.cart.length > 0){
			this.setState({ openDetails: true, openCart: false, cartError: '' });
		}else{
			this.setState({cartError: 'Your cart is empty'});
		}
		
	};

	handleCloseDetails = () => {
		this.setState({ openDetails: false, openCart: true, detailError: '' });
	};

	handleOpenCheckOut = () => {
		const {delName, delAddress, delPhone} = this.state;
		console.log(delName, delAddress, delPhone);
		if(delName !== '' || delAddress !== '' || delPhone !== ''){
			this.setState({ openCheckOut: true, openCart: false, openDetials: false, detailError: '' });
		}else{
			this.setState({detailError: 'All fields are required.'});
		}
		
	};

	handleCloseAll = ()=> {
		this.setState({openCart: false, openCheckOut: false, openDetails: false, cartError: ''});
	}

	handleCloseCheckOut = () => {
		this.setState({ openCart: true, openCheckOut: false });
	};

	handleChange = (key) => (event) => {
		console.log(event.target.value);
		this.setState({ [key]: event.target.value});
	};

	dateChange = (date) => {
		this.setState({delTime: date});
	}

	// submitOrder = async (total)=>{
    //     let { token } = await this.props.stripe.createToken({name: this.state.nameOnCard});

	// 	const order = {
	// 		token: token.id,
	// 		deliveryDate: this.state.delTime,
	// 		guestInfo: {
	// 			name: this.state.delName,
	// 			address: this.state.delAddress,
	// 			phone: this.state.delPhone
	// 		},
	// 		total
	// 	}
	// 	console.log('ORDER WAITING', order);
	// 	const charged = await this.props.createOrder(order);
	// 	if(charged.status === 200){
	// 		alert('Order Complete!');
	// 		this.props.closeAll();
	// 	}
		
    //   }

	render() {
		const path = this.props.history.location.pathname;
		if(path === '/'){
			this.props.history.push('/foods');
		}
		
		
		const { nameOnCard, delName, delAddress, delPhone, delTime} = this.state;
		return (
			<div className="home">
				<HeaderBar openCart={this.handleOpenCart} history={this.props.history} path={path} />
				<IconTabs history={this.props.history}/>
				<ModalCart cartError={this.state.cartError} open={this.state.openCart} closeCart={this.handleCloseCart} openDetails={this.handleOpenDetails}/>
				<ModalDetails detailError={this.state.detailError} dateChange={this.dateChange} handleChange={this.handleChange} open={this.state.openDetails} closeDetails={this.handleCloseDetails} openCheckOut={this.handleOpenCheckOut} delName={delName} delTime={delTime} delAddress={delAddress} delPhone={delPhone}/>
				<StripeProvider apiKey="pk_test_RwPXTOOT26zF8BncTe2MfAUO">
					<Elements>
						<ModalCheckOut submitOrder={this.submitOrder} nameOnCard={nameOnCard} handleChange={this.handleChange} open={this.state.openCheckOut} closeAll={this.handleCloseAll} closeCheckOut={this.handleCloseCheckOut} name={this.state.delName} address={this.state.delAddress} phone={this.state.delPhone} time={this.state.delTime}/>
					</Elements>
				</StripeProvider>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('home user', state.user);
	return {
		user: state.user,
		cart: state.cart
	}
}

export default connect(mapStateToProps, {})(Home);