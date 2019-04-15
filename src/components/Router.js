import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from './page-not-found/Page-not-found';
import Home from './home/Home';
import NavBar from './navbar/NavBar';
import Login from './login/Login';
import PrivateRoute from './private-route/Private-route.jsx';
import Albums from './albums/Albums';
import { getSessionFromStorage } from '../services/session';
import Photoalbums from './photo-album/Photoalbums';

//Servicios
import { getUsersWithAlbums } from '../services/users';
import getAllAlbums from '../services/albums';

//

export default function() {
  const [loggedUser, setLoggedUser] = useState(true);
  const [sessionInfo, setSessionInfo] = useState(undefined);
  const [albums, setAlbums] = useState(undefined);
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    loadSessionInfo();
  }, []);
  async function loadUersAndAlbums() {
    //Cuando carga el componente albums se caran del Api, Usuarios y albums, las fotos las cargo en el componente photo_albums
    const usersWA = await getUsersWithAlbums();
    setUsers(usersWA.data);
    //Usando promesas para obtener los albums
    getAllAlbums()
      .then(albumsResp => {
        setAlbums(albumsResp);
      })
      .catch(err => {
        console.log('error->', err);
      });
    setUsers(usersWA.data);
  }

  async function loadSessionInfo() {
    const sessionData = await getSessionFromStorage();
    if (sessionData) {
      setSessionInfo(sessionData);
      loadUersAndAlbums();
      setLoggedUser(true);
    } else {
      setSessionInfo(undefined);
      setLoggedUser(false);
    }
  }

  return (
    <div>
      <NavBar
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
        sessionInfo={sessionInfo}
      />

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
                users={users}
              />
            )}
          />
          <Route
            path="/albums/:albumId"
            exact
            render={props => {
              const userId = props.match.params.albumId;
              return (
                <PrivateRoute
                  component={Photoalbums}
                  loggedUser={loggedUser}
                  setLoggedUser={setLoggedUser}
                  userId={userId}
                  albums={albums}
                />
              );
            }}
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
