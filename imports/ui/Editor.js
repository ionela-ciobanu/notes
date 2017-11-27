import {Meteor} from 'meteor/meteor';
import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Notes} from '../api/notes';
import PropTypes from 'prop-types';
import createBrowserHistory from 'history/createBrowserHistory';

const customHistory = createBrowserHistory();

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    }
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({body});
    this.props.call('notes.update', this.props.note._id, {body});
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({title});
    this.props.call('notes.update', this.props.note._id, {title: e.target.value});
  }
  handleRemoval() {
    this.props.call('notes.remove', this.props.note._id);
    customHistory.push('/dashboard');
  }
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if(currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      })
    }
  }
  render() {
    if(this.props.note) {
      return (
        <div>
          <input value={this.state.title} placeholder="Your title here" onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <button onClick={this.handleRemoval.bind(this)}>Delete Note</button>
        </div>
      );
    } else if(this.props.selectedNoteId) {
      return (
        <p>Note not found.</p>
      );
    } else {
      return (
        <p>Pick or create a note to get started.</p>
      )
    }
  }
};

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string,
  call: PropTypes.func.isRequired
};

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
})(Editor);
