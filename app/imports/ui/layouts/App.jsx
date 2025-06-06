import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Dashboard from '../pages/dashboard/index';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import LearnMore from '../pages/LearnMore';
import ContactUs from '../pages/ContactUs';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import Terms from '../pages/Terms';
import Selection from '../pages/selection/Selection';
import ChatAssistantPage from '../pages/ChatAssistant';
import { dashboardConfig } from '../pages/dashboard/dashboardConfig';

// Create a component that redirects if authenticated
const LandingOrRedirect = () => {
  const isLoggedIn = Meteor.userId() !== null;
  return isLoggedIn ? <Navigate to="/selection" replace /> : <Landing />;
};

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {

  useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingOrRedirect />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/learnmore" element={<LearnMore />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/chat" element={<ChatAssistantPage />} />

          {/* Dashboard Parent Route */}
          <Route
            path="/home/*"
            element={(
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )}
          >
            {/* Nested Routes */}
            {dashboardConfig.sections.map((section) => section.navItems.map(({ id, path, component: Component }) => (
              <Route key={id} path={path} element={<Component />} />
            )))}
            {/* Default Route for /home */}
            <Route index element={<Navigate to="chat" replace />} />
          </Route>

          {/* Other Routes */}
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
