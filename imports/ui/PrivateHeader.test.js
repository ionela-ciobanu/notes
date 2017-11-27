import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import {PrivateHeader} from './PrivateHeader';

if(Meteor.isClient) {
  const title = "Test title";
  //spy(PrivateHeader.prototype, 'constructor');

  describe('PrivateHeader', function() {

    it('should set button text to logout', function() {
      const wrapper = shallow(<PrivateHeader title={title} handleLogout={() => {}}/>);
      const buttonText = wrapper.find('button').text();
      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', function() {
      const wrapper = shallow(<PrivateHeader title={title} handleLogout={() => {}}/>);
      const titleText = wrapper.find('h1').text();
      expect(titleText).toBe(title);
    });

    it('should call the function', () => {
      const spy = sinon.spy();
      spy('Hello', 'World');
      spy('Hello', 'Ionela');
      expect(spy.args.length).toBe(2);
    });

    it('should call handleLogout on click', function() {
      const spy = sinon.spy();
      const wrapper = shallow(<PrivateHeader title={title} handleLogout={spy}/>);

      wrapper.find('button').simulate('click');
      expect(spy.args.length).toBe(1);
    });
  });

}
