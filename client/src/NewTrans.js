import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class NewTrans extends React.Component {
	render() {
		return (
			<div className="new-trans">
				New transaction component
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {} 
}

export default connect(mapStateToProps, {  })(NewTrans);