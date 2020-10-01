import React from 'react';
import { Switch } from 'react-router-dom';

// Public routes
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

// Private routes
import Event from '../pages/Event';

// Useful components
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={SignIn} exact path="/" />
      <Route component={SignUp} path="/signup" />
      <Route component={ForgotPassword} path="/forgot" />
      <Route component={ResetPassword} path="/reset_password" />
      <Route component={Event} path="/events" isPrivate/>
      {/* <Route component={Event} path="/events" /> */}

    </Switch>
  );
};

export default Routes;
