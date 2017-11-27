import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import createBrowserHistory from 'history/createBrowserHistory';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

const customHistory = createBrowserHistory();

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  redirectIfUnauthenticated() {
    if(!Meteor.userId()) {
      customHistory.replace('/');
    }
  }
  componentWillMount() {
    console.log(customHistory.location.pathname.split('/')[2]);
    Session.set('selectedNoteId', customHistory.location.pathname.split('/')[2]);
    this.redirectIfUnauthenticated();
  }
  componentWillUpdate() {
    this.redirectIfUnauthenticated();
  }
  render() {
    return (
      <div>
        <PrivateHeader title="Dashboard"/>
        <div className="page-content">
          <NoteList />
          <Editor/>
        </div>
      </div>
    );
  }
};

export default withTracker((props) => {
  return {
    Session: Session,
    Subscription: Meteor.subscribe('notes', {
      onReady: () => {
        // const id = props.match.params.id;
        // if (!!id) {
        //     if (!Notes.findOne({ _id: props.match.params.id }))
        //     { props.history.push('/NotFound'); }
        //     else
        //     { Session.set('selectedNoteId', id); }
        // }
      }
    })
    };
})(Dashboard);
