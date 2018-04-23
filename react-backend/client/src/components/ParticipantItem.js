import React, { Component } from 'react';

class ParticipantItem extends Component {

  render() {

    return (
      //Layout-item for each participant
      <li className="Participant">
        <strong>{this.props.participant.first_name} {this.props.participant.last_name}</strong> - {this.props.participant.skills} - {this.props.participant.email}
      </li>
    );
  }
}

export default ParticipantItem;