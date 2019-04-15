import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

//servicios
import findByIdAlbums from '../../functions/helpers';

import './photoalbums.scss';

export default function({ userId, albums }) {
  if (!albums) {
    return false;
  }
  const [userAlbums, setUserAlbums] = useState(undefined);
  useEffect(() => {
    loadUserAlbums();
  }, []);

  async function loadUserAlbums() {
    const userAlbumsFilter = await findByIdAlbums(albums, userId);
    setUserAlbums(userAlbumsFilter);
  }

  return (
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
            return <p> {JSON.stringify(userAlbum)} </p>;
          })}
      </div>
    </div>
  );
}
