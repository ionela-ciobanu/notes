import {Meteor} from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';

import {Notes} from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import {Session} from 'meteor/session';

export const NoteList = (props) => {
  return(
    <div>
      <NoteListHeader />
      {props.notes.length === 0 ? <NoteListEmptyItem/> : undefined}
      {props.notes.map((note) => {
        return <NoteListItem key={note._id} note={note}/>
      })}
      NoteList {props.notes.length}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  };
})(NoteList);
