/**
 * ************************************
 *
 * @module  ConvoContainer
 * @author
 * @date
 * @description stateful component that renders MessageDisplay and MessageCreator
 *
 * ************************************
 */


import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Convo from '../components/Convo';


const mapStateToProps = (store) => ({
  userBase: store.chatbox.userBase,
  currentUser: store.chatbox.currentUser,
  conversationPartner: store.chatbox.conversationPartner
});

const mapDispatchToProps = (dispatch) => ({
  selectConversation: (currentUser, conversationPartner) => {dispatch(actions.selectConversation(currentUser, conversationPartner))}
});

class ConvoContainer extends Component {
  constructor(props) {
    super(props);
  }

	render() {
    const currentUser = this.props.currentUser;
    const selectConversation = this.props.selectConversation;
    const convos = Object.entries(this.props.userBase).map((user) => {
      if (user[0] !== currentUser.id) {
        return (
          <Convo currentUser={currentUser} id={user[0]} name={user[1]} selectConversation={selectConversation} />
        );
      }
    });

		return(
      <div className="convo-container">
        {convos}
      </div>
    );
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConvoContainer);