import React, { Component } from 'react';

import ParticipantItem from './ParticipantItem';

class Participants extends Component {

  render() {

    let participantItems;
    if(this.props.participants){
        participantItems = this.props.participants.map(participant => {
            return (
                <ParticipantItem key={participant.id} participant={participant} />
            );
        });
    }

    return (
      <div className="Participants">
        <h3>Participants.js</h3>
        {participantItems}
      </div>
    );
  }
}

export default Participants;
