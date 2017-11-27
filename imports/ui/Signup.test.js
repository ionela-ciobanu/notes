import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Signup} from './Signup';

Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {
  describe('Signup', function() {

    it('should show error messages', function() {
      const error = 'This is not working';
      const wrapper = shallow(<Signup createUser={() => {}}/>);

      wrapper.setState({error});
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', function() {
      const email = 'ionela@test.com';
      const password = 'password123';
      const spy = sinon.spy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Signup createUser={spy} />
        </MemoryRouter>
      );

      wrapper.find('input[name="email"]').instance().value = email;
      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit', {preventDefault: () => {}});

      expect(spy.called).toBe(true);
      expect(spy.firstCall.args[0]).toEqual({email, password});
    });

    it('should set error if sort password', function() {
      const email = 'ionela@test.com';
      const password = 'pass';
      const spy = sinon.spy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Signup createUser={spy} />
        </MemoryRouter>
      );

      wrapper.find('input[name="email"]').instance().value = email;
      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit');

      //expect(wrapper.state('error').length).toBeGreaterThan(0);
    });

    it('should set createUser callback errors', function() {
      const password = 'password123';
      const reason = 'This is why it failed';
      const spy = sinon.spy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Signup createUser={spy} />
        </MemoryRouter>
      );
      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit');
      spy.getCall(0).args[1]({reason});
      //expect(wrapper.state('error')).toBe(reason);

      spy.getCall(0).args[1]();
      //expect(wrapper.state('error').length).toBe(0);
    });

  });
}
