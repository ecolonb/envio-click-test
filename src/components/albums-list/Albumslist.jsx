import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { NavLink, Redirect } from 'react-router-dom';

//servicios
import findByIdAlbums from '../../functions/helpers';

import './albumslist.scss';

export default function({ userId, albums }) {
  if (!albums) {
    return false;
  }
  const [redirect, setRedirect] = useState(undefined);
  const [userAlbums, setUserAlbums] = useState(undefined);
  useEffect(() => {
    loadUserAlbums();
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
        Mostrando resultados del id usuario: {userId}
      </div>
      <div className="resultAlbumsUser">
        {userAlbums &&
          userAlbums.map(userAlbum => {
            return (
              <p
                onClick={() => {
                  setRedirect('/album/photos/' + userId + '/' + userAlbum.id);
                }}
              >
                {JSON.stringify(userAlbum)}
              </p>
            );
          })}
      </div>
    </div>
  );
}
