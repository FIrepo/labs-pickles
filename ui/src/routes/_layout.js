// @flow

import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import CommonsStore from '../stores/commons';
import MapsStore from '../stores/maps';
import MapsActions from '../actions/maps';
import DriversStore from '../stores/drivers';
import DriversActions from '../actions/drivers';

import { Events } from '../utils';

import { Map } from '../components/map';

new Events();

class Layout extends Component {

	constructor(props) {
		super(props);
		this.state = {}
		this.onChange = this.onChange.bind(this);
		this.fetchAddress = this.fetchAddress.bind(this);
		this.clearAddress = this.clearAddress.bind(this);
		this.fetchDriversFromAddress = this.fetchDriversFromAddress.bind(this);
	}

	getInitialState() {
		return {
			...CommonsStore.getState(),
			...MapsStore.getState(),
			...DriversStore.getState()
		}
	}

	fetchAddress() {
		if (!this.refs['search_by_address'].value.length) return;
		MapsActions.fetchAddress(this.refs['search_by_address'].value);
	}

	fetchDriversFromAddress() {
		DriversActions.fetchDriversFromCoordinates(
			this.state.address.geometry.location.lat,
			this.state.address.geometry.location.lng
		)
	}

	clearAddress() {
		MapsActions.clearAddress();
		this.refs['search_by_address'].value = "";
	}
	
	componentDidMount() {
		CommonsStore.listen(this.onChange);
		MapsStore.listen(this.onChange);
		DriversStore.listen(this.onChange);
		DriversActions.fetchDrivers();
	}
	componentWillUnmount() {
		CommonsStore.unlisten(this.onChange);
		MapsStore.unlisten(this.onChange);
		DriversStore.unlisten(this.onChange);
	}
	onChange(state) {
		if (state.hasOwnProperty('address') || state.hasOwnProperty('goto')) {
			if(state.hasOwnProperty('address') && state.address) state.goto = false;
			state.center_map = true;
		} else {
			state.center_map = false;
		}
		this.setState(state);
	}

	render() {
		let map_options = {
			drivers: this.state.drivers || [],
			containerElement: (<div className="map_container wow fadeIn" />),
			mapElement: (<div className= "map_wrapper" />)
		}

		// If address is set. Center map.
		if(this.state.address && this.state.center_map) {
			map_options.latitude = this.state.address.geometry.location.lat;
			map_options.longitude = this.state.address.geometry.location.lng;
		}

		if (this.state.goto && this.state.center_map) {
			map_options.latitude = this.state.goto.lat;
			map_options.longitude = this.state.goto.lng;
		}

		return (
			<div className="app_wrapper">
				{/* START: Navbar */}
				<div className="container navbar_wrapper">
					<nav className="navbar no-gutters-sm navbar-default">
						<div className="container-fluid">
							<div className="navbar-header">
								<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
								<Link className="navbar-brand" to="/">Pickles</Link>
							</div>
							<div id="navbar" className="navbar-collapse collapse">
								<ul className="nav navbar-nav">
									<li>
										<Link to="/">Map</Link>
									</li>
									<li>
										<Link to="/drivers">Drivers</Link>
									</li>
								</ul>
								<ul className="nav navbar-nav navbar-right">
									<li>
										<div className="navbar-form" role="search">
											<div className="input-group">
												<input disabled={this.state.address} type="search" ref="search_by_address" className="form-control" placeholder="Address search" />
												<div className="input-group-btn">
													{!this.state.address ? (
														<button onClick={this.fetchAddress} className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i></button>
													) : <button onClick={this.clearAddress} className="btn btn-default" type="button"><i className="glyphicon glyphicon-remove"></i></button>
													}
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</nav>
					<div className="well drivers-options no-gutters-sm">
						<div className="btn-group">
							<button onClick={DriversActions.fetchDrivers} className="btn btn-default" type="button">
								<i className="glyphicon glyphicon-globe"></i> Show all drivers
							</button>
							{this.state.address ? (
								<button onClick={this.fetchDriversFromAddress} className="btn btn-success" type="button">
									<i className="glyphicon glyphicon-record"></i> Show drivers nearby
								</button>
							) : null}
						</div>
						{this.state.drivers ? (
							<small className="pull-right text-muted">
								Showing {this.state.drivers.length} driver(s) {this.state.from_coordinates ? "nearby" : "worldwide"}
							</small>
						) : null}
					</div>
				</div>
				{/* END: Navbar */}
				{/* START: Dialog */}
				{this.dialog && this.dialog.open ? 
					<div className="modal fade" role="dialog">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
									<h4 className="modal-title">{this.dialog.title}</h4>
								</div>
								<div className="modal-body">
									<p>{this.dialog.message}</p>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>
				: null}
				{/* END: Dialog */}
				{/* START: Map */}
				<Map {...map_options}/>
				{/* END: Map */}
				{/* START: Routes */}
				{this.props.children}
				{/* END: Routes */}
			</div>
		);
	}
}

export default Layout;
