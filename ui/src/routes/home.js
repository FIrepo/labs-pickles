// @flow

import React, { Component } from 'react';

import CommonsStore from '../stores/commons';

class Home extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {};
  }
	
	getInitialState() {
		return CommonsStore.getState();
	}
	componentDidMount() {
		CommonsStore.listen(this.onChange);
	}
	componentWillUnmount() {
		CommonsStore.unlisten(this.onChange);
	}
	onChange(state) {
		this.setState(state);
	}

  render() {
    return (
      <div className="home">
					
			</div>
    );
  }
}

export default Home;
