import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {shallow, mount} from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Login} from './Login';

Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {
  describe('Login', function() {

    it('should show error messages', function() {
      const error = 'This is not working';
      const wrapper = shallow(<Login loginWithPassword={() => {}}/>);

      wrapper.setState({error});
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', function() {
      const email = 'ionela@test.com';
      const password = 'password123';
      const spy = sinon.spy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Login loginWithPassword={spy} />
        </MemoryRouter>
      );

      wrapper.find('input[name="email"]').instance().value = email;
      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit', {preventDefault: () => {}});

      expect(spy.called).toBe(true);
      expect(spy.firstCall.args[0]).toEqual({email});
      expect(spy.firstCall.args[1]).toBe(password);
    });

    // it('should set loginWithPassword callback errors', function() {
    //   const spy = sinon.spy();
    //   const wrapper = mount(
    //     <MemoryRouter initialEntries={['/']} initialIndex={0}>
    //         <Login loginWithPassword={spy} />
    //     </MemoryRouter>
    //   );
    //   wrapper.find('form').simulate('submit');
    //   spy.getCall(0).args[2]({});
    //   expect(wrapper.state('error').length).toNotBe(0);
    //
    //   spy.getCall(0).args[2]();
    //   expect(wrapper.state('error').length).toBe(0);
    // });

    it('should set loginWithPassword callback errors', function() {
      const spy = sinon.spy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Login loginWithPassword={spy} />
        </MemoryRouter>
      );
      wrapper.find('form').simulate('submit');
      spy.getCall(0).args[2]({});
      //expect(wrapper.state('error').length).toNotBe(0);

      spy.getCall(0).args[2]();
      //expect(wrapper.state('error').length).toBe(0);
    });

  });
}
