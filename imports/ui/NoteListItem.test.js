import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

import NoteListItem from './NoteListItem';

if(Meteor.isClient) {
  describe('NoteListItem', function() {
    it('should render title and timestamp', function() {
      const title = 'My title';
      const updatedAt = 1511775190372;
      const wrapper = shallow(<NoteListItem note={{title, updatedAt}}/>);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('27/11/17');
    });

    it('should set default title if no title set', function() {
      const title = '';
      const updatedAt = 1511775190372;
      const wrapper = shallow(<NoteListItem note={{title, updatedAt}}/>);

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });
  });
}
