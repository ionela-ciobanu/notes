import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {spy} from 'sinon';
import {shallow, mount} from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {NoteListHeader} from './NoteListHeader';

if(Meteor.isClient) {
  describe('NoteListHeader', function() {
    it('should call meterCall on click', function() {
      const spy = sinon.spy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <NoteListHeader meteorCall={spy} />
        </MemoryRouter>
      );
      wrapper.find('button').simulate('click');

      expect(spy.calledWith('notes.insert')).toBe(true);
    });
  });
}
