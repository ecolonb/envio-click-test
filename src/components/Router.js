import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from './page-not-found/Page-not-found';
import Home from './home/Home';
import NavBar from './navbar/NavBar';
import Login from './login/Login';
import PrivateRoute from './private-route/Private-route.jsx';
import Albums from './albums/Albums';
import { getSessionFromStorage } from '../services/session';
import Albumslist from './albums-list/Albumslist';

//Servicios
import getUsersByPage, { getUsersWithAlbums } from '../services/users';
import getAllAlbums, { getAllPhotos } from '../services/albums';

//Components
import Photoalbum from './photo-album/Photoalbum';

export default function() {
  const [loggedUser, setLoggedUser] = useState(true);
  const [sessionInfo, setSessionInfo] = useState(undefined);
  const [albums, setAlbums] = useState(undefined);
  const [users, setUsers] = useState(undefined);
  const [photos, setPhotos] = useState(undefined);
  const [userList, setUserList] = useState([]);

  //Paginación
  const [final, setFinal] = useState(false);
  const [pagina, setPagina] = useState(1);

  const fakeDescription = `Some quick example text to build on the cardd title and
                      makee up thes bulk of the card's content...`;

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
    const photos = await getAllPhotos();
    setPhotos(photos);
    const usersByPage = await getUsersByPage(1);
    if (usersByPage) {
      await usersByPage.data.map((element, index) => {
        return (element.description = fakeDescription);
      });
      setUserList([...userList, ...usersByPage.data]);
    }
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
        setUsers={setUsers}
        setAlbums={setAlbums}
        setPhotos={setPhotos}
        setUserList={setUserList}
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
                userList={userList}
                setUserList={setUserList}
                final={final}
                setFinal={setFinal}
                pagina={pagina}
                setPagina={setPagina}
              />
            )}
          />
          <Route
            path="/login"
            exact
            render={() => {
              return (
                <Login
                  loggedUser={loggedUser}
                  setLoggedUser={setLoggedUser}
                  setUsers={setUsers}
                  setAlbums={setAlbums}
                  setPhotos={setPhotos}
                  setUserList={setUserList}
                  userList={userList}
                />
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
            path="/albums/:userId"
            exact
            render={props => {
              const userId = props.match.params.userId;
              return (
                <PrivateRoute
                  component={Albumslist}
                  loggedUser={loggedUser}
                  setLoggedUser={setLoggedUser}
                  userId={userId}
                  users={users}
                  albums={albums}
                />
              );
            }}
          />
          <Route
            path="/album/photos/:userId/:albumId"
            exact
            render={props => {
              const albumId = props.match.params.albumId;
              const userId = props.match.params.userId;
              return (
                <PrivateRoute
                  component={Photoalbum}
                  loggedUser={loggedUser}
                  setLoggedUser={setLoggedUser}
                  albumId={albumId}
                  userId={userId}
                  photos={photos}
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
