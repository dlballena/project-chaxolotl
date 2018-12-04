/**
 * ************************************
 *
 * @module  MainContainer
 * @author
 * @date
 * @description stateful component that renders ChatBoxContainer
 *
 * ************************************
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import ConvoContainer from './ConvoContainer';
import RecContainer from './RecContainer';
import ChatBoxContainer from './ChatBoxContainer';


const mapStateToProps = (store) => ({	
});

const mapDispatchToProps = dispatch => ({
	getUsers: () => dispatch(actions.getUsers())
});


class MainContainer extends Component {
	constructor(props) {
		super(props);
	}

	// this is where we connect that backend and frontend
	componentDidMount() {
		// populates user base of app
		this.props.getUsers();
	}

	render() {
		return (
      <div className="main-container">
        <ConvoContainer />
        <RecContainer />
        <ChatBoxContainer />                            
      </div>
    )
  };
};

// connects state and dispatch from store to MainContainer's props
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);