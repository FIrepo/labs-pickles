// @flow

import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import CommonsStore from '../stores/commons';
import DriversStore from '../stores/drivers';
import DriversActions from '../actions/drivers';

class Drivers extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {};
  }
	
	getInitialState() {
		return {
			...CommonsStore.getState(),
			...DriversStore.getState(),
		}
	}
	componentDidMount() {
		CommonsStore.listen(this.onChange);
		DriversStore.listen(this.onChange);
	}
	componentWillUnmount() {
		CommonsStore.unlisten(this.onChange);
		DriversStore.unlisten(this.onChange);
	}
	onChange(state) {
		this.setState(state);
	}

  render() {
		console.log(this.state.drivers);
    return (
			<div className="drivers-wrapper wow bounceInRight">
				<Link className="close-btn btn btn-default" to="/">
					<i className="glyphicon glyphicon-remove"></i>
				</Link>
			</div>
    );
  }
}

export default Drivers;
