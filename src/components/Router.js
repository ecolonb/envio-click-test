import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from './page-not-found/Page-not-found';
import Home from './home/Home';
import NavBar from './navbar/NavBar';
import Login from './login/Login';
import PrivateRoute from './private-route/Private-route';
import Albums from './albums/Albums';

export default function() {
  const [loggedUser, setLoggedUser] = useState(false);
  return (
    <div>
      <NavBar loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <main>
        <Switch>
          <Route
            path="/home"
            exact
            render={() => (
              <PrivateRoute
                component={Home}
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
              />
            )}
          />
          <Route
            path="/login"
            exact
            render={() => {
              return (
                <Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
              );
            }}
          />
          <Route
            path="/albums"
            exact
            render={() => (
              <PrivateRoute
                component={Albums}
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={() => (
              <PrivateRoute
                component={Home}
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
              />
            )}
          />
          <Route
            render={() => {
              return <PageNotFound />;
            }}
          />
        </Switch>
      </main>
    </div>
  );
}
