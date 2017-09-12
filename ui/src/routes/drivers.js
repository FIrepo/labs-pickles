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
		
		this.createDriver = this.createDriver.bind(this);
  }
	
	getInitialState() {
		return {
			...CommonsStore.getState(),
			...DriversStore.getState()
		}
	}

	createDriver() {
		DriversActions.createDriver({
			name: this.refs['driver-form__name'].value || "",
			email: this.refs['driver-form__email'].value || "",
			lat: this.refs['driver-form__lat'].value || "",
			lng: this.refs['driver-form__lng'].value || "",
		});
	}

	componentDidMount() {
		CommonsStore.listen(this.onChange);
		DriversStore.listen(this.onChange);
		this.onChange(this.getInitialState());
	}
	componentWillUnmount() {
		CommonsStore.unlisten(this.onChange);
		DriversStore.unlisten(this.onChange);
	}

	onChange(state) {
		if (!state.hasOwnProperty('driver_form_msg')) {
			this.refs['driver-form__name'].value = "";
			this.refs['driver-form__email'].value = "";
			this.refs['driver-form__lat'].value = "";
			this.refs['driver-form__lng'].value = "";
			state.driver_form_msg = false;
		}
		this.setState(state);
	}

  render() {
    return (
			<div className="drivers-wrapper wow bounceInRight">
				<Link className="close-btn btn btn-default" to="/">
					<i className="glyphicon glyphicon-remove"></i>
				</Link>
				<div className="drivers-form container-fluid">
					<h1>Add a new driver</h1>
					<div className="row">
						<div className="col-lg-6 col-sm-6">
							<input ref="driver-form__name" className="form-control" type="text" placeholder="Name"/>
						</div>
						<div className="col-lg-6 col-sm-6">
							<input ref="driver-form__email" className="form-control" type="text" placeholder="Email" />
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6 col-sm-6">
							<input ref="driver-form__lat" className="form-control" type="text" placeholder="Latitude"/>
						</div>
						<div className="col-lg-6 col-sm-6">
							<input ref="driver-form__lng" className="form-control" type="text" placeholder="Longitude" />
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<button onClick={this.createDriver} type="button" className="btn btn-success">
								Save
							</button>
						</div>
					</div>
					{this.state.driver_form_msg ? (
						<div className="alert alert-danger">
							{this.state.driver_form_msg}
						</div>
					) : null}
				</div>
				<div className="container-fluid drivers-list">
					<h1>Drivers list</h1>
					{!this.state.drivers || !this.state.drivers.length ? (
						<small className="text-center text-muted">No drivers</small>
					) : null}
					<ul className="no-gutters-sm no-gutters-lg">
						{this.state.drivers ? this.state.drivers.map((d, i) => {
							return (
								<li key={i}>
									<a style={{cursor: "pointer"}} onClick={DriversActions.goToDriver.bind(this, d)}>{d.name}</a>
									<a style={{cursor: "pointer"}} onClick={DriversActions.deleteDriver.bind(this, d.id)}><i className="glyphicon pull-right glyphicon-remove"></i></a>
								</li>
							)
						}) : null}
					</ul>
				</div>
			</div>
    );
  }
}

export default Drivers;
