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
		nameOnCard: ''
	}

	componentDidMount() {
		console.log('comp mount');
		const path = this.props.history.location.pathname;
		
	}

	handleOpenCart = () => {
		this.setState({ openCart: true });
	};

	handleCloseCart = () => {
		this.setState({ openCart: false });
	};

	handleOpenDetails = () => {
		this.setState({ openDetails: true, openCart: false });
	};

	handleCloseDetails = () => {
		this.setState({ openDetails: false, openCart: true });
	};

	handleOpenCheckOut = () => {
		this.setState({ openCheckOut: true, openCart: false, openDetials: false });
	};

	handleCloseAll = ()=> {
		this.setState({openCart: false, openCheckOut: false, openDetails: false});
	}

	handleCloseCheckOut = () => {
		this.setState({ openCart: true, openCheckOut: false });
	};

	handleChange = (key) => (event) => {
		console.log(event.target);return;
		this.setState({ [key]: event.target.value});
	};

	dateChange = (date) => {
		this.setState({delTime: date});
	}

	submitOrder = async (total)=>{
        let { token } = await this.props.stripe.createToken({name: this.state.nameOnCard});

		const order = {
			token: token.id,
			delAddress: this.state.delAddress,
			delPhone: this.state.delphone,
			delTime: this.state.delTime,
			delName: this.state.delName,
			total
		}
		console.log('ORDER WAITING', order);
		const charged = await this.props.createOrder(order);
		if(charged.status === 200){
			alert('Order Complete!');
			this.props.closeAll();
		}
		
      }

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
				<ModalCart open={this.state.openCart} closeCart={this.handleCloseCart} openDetails={this.handleOpenDetails}/>
				<ModalDetails dateChange={this.dateChange} handleChange={this.handleChange} open={this.state.openDetails} closeDetails={this.handleCloseDetails} openCheckOut={this.handleOpenCheckOut} delName={delName} delTime={delTime} delAddress={delAddress} delPhone={delPhone}/>
				<StripeProvider apiKey="pk_test_RwPXTOOT26zF8BncTe2MfAUO">
					<Elements>
						<ModalCheckOut submitOrder={this.submitOrder} nameOnCard={nameOnCard} handleChange={this.handleChange} open={this.state.openCheckOut} closeAll={this.handleCloseAll} closeCheckOut={this.handleCloseCheckOut} />
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