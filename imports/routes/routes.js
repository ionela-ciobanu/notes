import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router';
import {Route, Router, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
const customHistory = createBrowserHistory();

export const onAuthChange = (isAuthenticated) => {
  const pathname = customHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    customHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    customHistory.replace('/');
  }
}

export const routes = (
  <Router history={customHistory}>
      <Switch>
        <Route exact path='/' render={() => (
          Meteor.userId() ?
          ( <Redirect to="/dashboard"/> ) : ( <Login/> ) ) } />
        <Route path='/signup' render={() => (
          Meteor.userId() ?
          ( <Redirect to="/dashboard"/> ) : ( <Signup/> ) ) } />
        <Route path='/dashboard' render={() => (
          !Meteor.userId() ?
          ( <Redirect to="/"/> ) : ( <Dashboard/> ) ) } />
          <Route path='/dashboard/:id' render={() => (
            !Meteor.userId() ?
            ( <Redirect to="/"/> ) : ( <Dashboard/> ) ) } />
        <Route render={() => (<NotFound/>)}/>
      </Switch>
  </Router>
);
