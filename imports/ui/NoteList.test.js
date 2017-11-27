import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {spy} from 'sinon';
import {shallow, mount} from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {NoteList} from './NoteList';
import {notes} from '../fixtures/fixtures';

if(Meteor.isClient) {

  describe('NoteList', function() {

    it('should render NoteListItem for each note' , function() {
      const wrapper = mount(<NoteList notes={notes}/>);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render NoteListEmptyItem if zero notes', function() {
      const wrapper = mount(<NoteList notes={[]}/>);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });

  });

}
