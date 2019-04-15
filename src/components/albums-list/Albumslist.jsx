import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { NavLink, Redirect } from 'react-router-dom';

import { Card } from 'react-bootstrap';
//servicios
import findByIdAlbums from '../../functions/helpers';

import './albumslist.scss';

export default function({ userId, albums, users }) {
  if (!albums || !users) {
    return false;
  }
  const [user, setUser] = useState(undefined);
  const [redirect, setRedirect] = useState(undefined);
  const [userAlbums, setUserAlbums] = useState(undefined);
  useEffect(() => {
    loadUserAlbums();
    const userFilter = users.filter(u => Number(u.id) === Number(userId));
    setUser(userFilter[0]);
  }, []);

  async function loadUserAlbums() {
    const userAlbumsFilter = await findByIdAlbums(albums, userId);
    setUserAlbums(userAlbumsFilter);
  }

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <div className="album-container">
      <div className="go-back">
        <NavLink to="/albums" className="navlink-goback">
          <FaArrowLeft className="iconGoBack" />
        </NavLink>
      </div>
      <div className="text-center">
        <h1>{user && user.name}</h1>
        <span> {user && user.email}</span>
      </div>
      <div className="result-albums-user">
        {userAlbums &&
          userAlbums.map(userAlbum => {
            return (
              <Card
                className="card w-25"
                onClick={() => {
                  setRedirect('/album/photos/' + userId + '/' + userAlbum.id);
                }}
              >
                <Card.Body>
                  <Card.Title>{userAlbum.title}</Card.Title>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
